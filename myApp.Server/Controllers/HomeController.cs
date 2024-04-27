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

        [HttpPost]
        public IActionResult Post()
        {
            var responseData = new { message = "Hello from backend!" };
            return Ok(responseData); // Возвращаем JSON данные
        }
    }
}
