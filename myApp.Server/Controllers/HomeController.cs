using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace myApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {

        [HttpPost("process-inputs")]
        public IActionResult ProcessInputs([FromBody] InputData inputData)
        {
            if (inputData == null)
            {
                return BadRequest("Input data is required.");
            }

            if (!int.TryParse(inputData.InputValue1, out int intValue1) || intValue1 < 0 || intValue1 > 99999)
            {
                return BadRequest("Invalid value for Input 1.");
            }

            if (inputData.InputValue2Upper.Length != 3 || !inputData.InputValue2Upper.Equals(inputData.InputValue2Upper.ToUpper()))
            {
                return BadRequest("Invalid value for Input 2.");
            }

            if (inputData.InputValue3Lower.Length != 3 || !inputData.InputValue3Lower.Equals(inputData.InputValue3Lower.ToLower()))
            {
                return BadRequest("Invalid value for Input 3.");
            }

            if (!int.TryParse(inputData.InputValue4Negative, out int intValue4Negative) || intValue4Negative > -1 || intValue4Negative < -99999)
            {
                return BadRequest("Invalid value for Input 4.");
            }

            var utf8Bytes = Encoding.UTF8.GetBytes(inputData.InputValue1 + inputData.InputValue2Upper + inputData.InputValue3Lower + inputData.InputValue4Negative);
            double sum = 0;
            foreach (var utf8Byte in utf8Bytes)
            {
                sum += utf8Byte;
            }

            var result = sum;

            var resultWithPvn = sum * 1.21;

            var nds = resultWithPvn - result;

            return Ok(new { result, resultWithPvn, nds});
        }
    }

    public class InputData
    {
        public string InputValue1 { get; set; }
        public string InputValue2Upper { get; set; }
        public string InputValue3Lower { get; set; }
        public string InputValue4Negative { get; set; }
    }
}
