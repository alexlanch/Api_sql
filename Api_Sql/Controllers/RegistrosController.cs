using Api_Sql.Modelos;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Sql.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrosController : ControllerBase
    {
        private readonly string _connectionString = string.Empty;

        public RegistrosController(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionStringAccessControl") ?? string.Empty;
        }

         // GET: api/<RegistrosController>
        [HttpGet]
        public IEnumerable<Registros> Get()
        {
            using (var connectionSql = new SqlConnection(_connectionString))
            {
                var query = "sp_GetAllRegistros";
                var oRegistrosList = connectionSql.Query<Registros>(
                    query,
                    commandType: CommandType.StoredProcedure
                ).ToList();

                return oRegistrosList;
            }
        }


        // GET: api/<RegistrosController>/{documento}
        [HttpGet("{documento}")]
        public IActionResult GetByDocumento(string documento)
        {
            using (var connectionSql = new SqlConnection(_connectionString))
            {
                var query = "sp_GetRegistroByDocumento";
                var registro = connectionSql.QueryFirstOrDefault<Registros>(
                    query,
                    new { documento = documento },
                    commandType: CommandType.StoredProcedure
                );

                if (registro != null)
                {
                    return Ok(registro);
                }
                else
                {
                    return NotFound();
                }
            }
        }



        // POST: api/<RegistrosController>
        [HttpPost]
        public IActionResult Post([FromBody] Registros nuevoRegistro)
        {
            using (var connectionSql = new SqlConnection(_connectionString))
            {
                var query = "sp_InsertRegistro";
                var parameters = new
                {
                    documento = nuevoRegistro.documento,
                    Nombre = nuevoRegistro.Nombre,
                    Apellido = nuevoRegistro.Apellido
                };

                var newId = connectionSql.QuerySingle<int>(
                    query,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return CreatedAtAction(nameof(Get), new { id = newId }, nuevoRegistro);
            }
        }



        // PUT: api/<RegistrosController>/{documento}
        [HttpPut("{documento}")]
        public IActionResult PutByDocumento(string documento, [FromBody] Registros registroActualizado)
        {
            using (var connectionSql = new SqlConnection(_connectionString))
            {
                var query = "sp_UpdateRegistroByDocumento";
                var parameters = new
                {
                    
                    documento = documento,
                    Nombre = registroActualizado.Nombre,
                    Apellido = registroActualizado.Apellido
                };
                
                var result = connectionSql.Execute(
                    query,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
                
                if (result > 0)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
        }





        // DELETE: api/<RegistrosController>/{documento}
        [HttpDelete("{documento}")]
        public IActionResult Delete(int documento)
        {
            using (var connectionSql = new SqlConnection(_connectionString))
            {
                var query = "sp_DeleteRegistroByDocumento";
                var result = connectionSql.Execute(
                    query,
                    new { documento = documento },
                    commandType: CommandType.StoredProcedure
                );

                if (result > 0)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
        }
    }
}

