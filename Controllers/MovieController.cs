using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using MovieMatch.Models;
using MovieMatch.Data;
using Microsoft.AspNetCore.Mvc;
using TmdbEasy.Interfaces;
using TmdbEasy.DTO.Certifications;

namespace MovieMatch.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MovieController : ControllerBase
{
   private MovieMatchDbContext _dbContext;
      private readonly IMovieApi _movieApi;

   public MovieController(MovieMatchDbContext context, IMovieApi movieApi)
    {
        _dbContext = context;
        _movieApi = movieApi;
    }
     

     [HttpGet("top-rated")]
     [Authorize]
     public async Task<IActionResult> GetTopRatedMovies()
     {
    var task = await _movieApi.GetTopRatedAsync();
    return Ok(task);
     }

     [HttpGet("latest-release")]
     [Authorize]
     public async Task<IActionResult> GetLatestMovies()
     {
    var task = await _movieApi.GetNowPlayingAsync();
      return Ok(task);
     }

     [HttpGet("popular")]
     [Authorize]
     public async Task<IActionResult> GetPopularMovies()
     {
    var task = await _movieApi.GetPopularAsync();
      return Ok(task);
     }

     
    [HttpGet("search")]
    [Authorize]
    public async Task<IActionResult> SearchMovies(string query)
    {
    var searchResults = await _movieApi.SearchMoviesAsync(query);
    return Ok(searchResults);
    }   

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> getMovieDetail(int id)
    {
      var movie = await _movieApi.GetDetailsAsync(id);
      return Ok(movie);
    }

}