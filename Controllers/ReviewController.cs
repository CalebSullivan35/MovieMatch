using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieMatch.Data;

namespace MovieMatch.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
  private MovieMatchDbContext _dbContext; 

  public ReviewController(MovieMatchDbContext context)
  {
    _dbContext = context;
  }

  [HttpGet]
  [Authorize]
  public IActionResult Get()
  {
    return Ok(_dbContext.Reviews);
  }
}