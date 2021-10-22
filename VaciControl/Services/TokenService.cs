using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using VaciControl.DTOs;
using VaciControl.Models;
using VaciControl.Repositories;


/*Necessário usar o Nuget e adicionar dois pacotes, sendo eles:
 Microsoft.AspNetCore.Authentication
 Microsoft.AspNetCore.Authentication.JwtBearer
Obs.: Fiz a instalação apenas no projeto VaciControl
 */
namespace VaciControl.Services
{
    public static class TokenService
    {
        public static string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler(); //Criando um objeto de JwtSecurityTokenHandler
            var key = Encoding.ASCII.GetBytes(Settings.Secret); //Gera um array de bytes da chave secreta
            var tokenDescriptor = new SecurityTokenDescriptor //Cria um objeto 
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Nome),
                    new Claim(ClaimTypes.Email, user.Email),                   
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(3), //Tempo que o Token expira
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) //Assinatura de credencial
            };
            var token = tokenHandler.CreateToken(tokenDescriptor); //Cria o token
            return tokenHandler.WriteToken(token); //Escreve e retona como string
        }
        
        public static string GetValueFromClaim(IIdentity identity, string field)
        {
            var claims = identity as ClaimsIdentity; //Convertendo o identity em ClaimsIdentity;

            return claims.FindFirst(field).Value;
        }
    }
}
