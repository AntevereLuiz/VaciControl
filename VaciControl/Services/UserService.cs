using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Repositories;
using VaciControl.UoW;

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

        public void Delete(UserDto userDto)
        {
            userDto.Status = false;
            var user = _mapper.Map<User>(userDto);

            _userRepository.Update(user);
            _unitOfWork.Commit();
        }

        public List<UserDto> GetAll()
        {
            var allUsers = _userRepository.GetAll().ToList();
            var allUsersDto = _mapper.Map<List<UserDto>>(allUsers);

            return allUsersDto;
        }

        public List<UserDto> GetAllWithConditions(Expression<Func<User, bool>> predicate)
        {
            var ativos = _userRepository.GetAllWithConditions(predicate);
            var ativosDto = _mapper.Map<List<UserDto>>(ativos);

            return ativosDto;
        }

        public UserDto GetById(Guid id)
        {
            var user = _userRepository.GetById(x => x.Id == id);
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
    }
}
