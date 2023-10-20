using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieMatch.Data;
using MovieMatch.Models;
using TmdbEasy.Interfaces;

namespace MovieMatch.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
  private MovieMatchDbContext _dbContext; 
  private readonly IMovieApi _movieApi;

  public ReviewController(MovieMatchDbContext context, IMovieApi movieApi)
  {
    _dbContext = context;
    _movieApi = movieApi;
  }

  [HttpGet]
  [Authorize]
  public IActionResult Get()
  {
    return Ok(_dbContext.Reviews);
  }

  [HttpGet("{id}/movie")]
  [Authorize]
  public async Task<IActionResult> GetReviewsBasedOnMovie(int id)
  {
    var results = _dbContext.Reviews
    .Include(r => r.UserProfile)
    .Where((r) => r.MatchingMovieInteger == id).ToList();
    if (results == null)
    {
      return NotFound();
    }

  foreach(Review result in results)
  {
    var apiMovie = await _movieApi.GetDetailsAsync(result.MatchingMovieInteger);
    
     Movie foundMovie = new Movie()
      {
        Id = apiMovie.Id,
        Title = apiMovie.Title,
        Overview = apiMovie.Overview,
        ReleaseDate = apiMovie.Release_date,
        PosterPath = apiMovie.Poster_path.ToString(),
        OriginalLanguage = apiMovie.Original_language,
        VoteAverage = apiMovie.Vote_average,
        Popularity = apiMovie.Popularity,
        RunTime = apiMovie.Runtime,
        Revenue = apiMovie.Revenue,
        Tagline = apiMovie.Tagline,
        Budget = apiMovie.Budget,     
      };
      result.Movie = foundMovie;
  }
    return Ok(results);
  }

  [HttpPost]
  [Authorize]
  public IActionResult createNewReview(Review newReview)
  {
    newReview.DateAdded = DateTime.Now;
    _dbContext.Reviews.Add(newReview);
    _dbContext.SaveChanges();
    return Created($"/api/review/{newReview.Id}", newReview);
  }

  //delete a relationship
  [HttpDelete("{id}/delete")]
  [Authorize]
  public IActionResult deleteReview(int id)
  {
    Review reviewToDelete = _dbContext.Reviews.SingleOrDefault(usp => usp.Id == id);
    if (reviewToDelete == null)
    {
      return NotFound();
    }
    _dbContext.Reviews.Remove(reviewToDelete);
    _dbContext.SaveChanges();
    return NoContent();
  }
}