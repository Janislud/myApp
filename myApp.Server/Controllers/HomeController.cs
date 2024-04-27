using Microsoft.AspNetCore.Mvc;

namespace myApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var responseData = new { message = "Hello from backend!" };
            return Ok(responseData); // Возвращаем JSON данные
        }

        [HttpPost("multiply")]
        public IActionResult MultiplyBy1_21([FromBody] NumberModel model)
        {
            if (model == null || model.Number == null)
            {
                return BadRequest("Number is required.");
            }

            if (!int.TryParse(model.Number, out int number))
            {
                return BadRequest("Invalid number format.");
            }

            // Умножаем число на 1.21
            var result = number * 1.21;
            return Ok(new { result });
        }

    }

    public class NumberModel
    {
        public string Number { get; set; }
    }
}
