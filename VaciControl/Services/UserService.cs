using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Repositories;
using VaciControl.UoW;
using System.Security.Cryptography;
using System.Text;

namespace VaciControl.Services
{
    public class UserService : IUserService
    {
        private IUnitOfWork _unitOfWork;
        private IUserRepository _userRepository;
        private IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork,
                           IUserRepository userRepository,
                           IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public List<UserDto> GetAll()
        {
            var allUsers = _userRepository.GetAll().ToList();
            var allUsersDto = _mapper.Map<List<UserDto>>(allUsers);

            return allUsersDto;
        }

        public List<UserDto> GetAllWithConditions(UserFilter filter)
        {
            var users = _userRepository.GetAllWithConditions(x => x.Nome.Contains(filter.Nome) &&
                                                                  x.Cpf.Contains(filter.Cpf) &&
                                                                  x.Email.Contains(filter.Email) &&
                                                                  (filter.Status == null || x.Status == filter.Status.Value));
            var usersDto = _mapper.Map<List<UserDto>>(users);

            return usersDto;
        }

        public UserDto GetById(Guid id)
        {
            var user = _userRepository.GetById(x => x.Id == id);
            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }

        public UserDto GetByCPF(string cpf)
        {
            var user = _userRepository.GetByCPF(x => x.Cpf == cpf);
            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }

        public void Insert(UserDto userDto)
        {
            userDto.Status = true;
            var user = _mapper.Map<User>(userDto);

            _userRepository.Insert(user);
            _unitOfWork.Commit();
        }

        public void Update(UserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);

            _userRepository.Update(user);
            _unitOfWork.Commit();
        }

        public void Delete(UserDto userDto)
        {
            userDto.Status = false;
            var user = _mapper.Map<User>(userDto);

            _userRepository.Update(user);
            _unitOfWork.Commit();
        }

        public UserAuthenticateResponseViewModel Authenticate(UserAuthenticateRequestViewModel user)
        {
            if (string.IsNullOrEmpty(user.CPF) || string.IsNullOrEmpty(user.Password))
                throw new Exception("CPF/Password are required.");            

            //Se passar a criptografia antes de comparar não encontra o usuário
            //user.Password = EncryptPassword(user.Password);

            /* o CPF no banco está salvo com a mask, por isso ao comparar lembrar de passar ela */
            User _user = _userRepository.GetByCPF(x => x.Status && x.Cpf == user.CPF && x.Password.ToLower() == user.Password.ToLower());           

            if (_user == null)
                throw new Exception("User not found");

            return new UserAuthenticateResponseViewModel(_mapper.Map<User>(_user), TokenService.GenerateToken(_user)); //Preciso passar para o método o usuário e o Token
        }

        private string EncryptPassword(string password)
        {
            HashAlgorithm sha = new SHA1CryptoServiceProvider();

            byte[] encryptedPassword = sha.ComputeHash(Encoding.UTF8.GetBytes(password));

            StringBuilder stringBuilder = new StringBuilder();
            foreach (var caracter in encryptedPassword)
            {
                stringBuilder.Append(caracter.ToString("X2"));
            }

            return stringBuilder.ToString();
        }
    }
}
