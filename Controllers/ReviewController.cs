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
  //get all reviews for a movie. 
  [HttpGet("{id}/movie")]
  [Authorize]
  public async Task<IActionResult> GetReviewsBasedOnMovie(int id)
  {
    var results = _dbContext.Reviews
    .Include(r => r.UserProfile)
    .Where((r) => r.MatchingMovieInteger == id).OrderBy(r => r.DateAdded).ToList();
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
  //post a relationship
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
  //get a review based on review id
  [HttpGet("{id}")]
  [Authorize]
  public IActionResult getReview(int id)
  {

    Review reviewToReturn = _dbContext.Reviews.SingleOrDefault(r => r.Id == id);
    if (reviewToReturn == null){
      return NotFound();
    }
    return Ok(reviewToReturn);
  }

  //do a put next. 
  [HttpPut("{id}")]
  [Authorize]
  public IActionResult updateReview(Review updatedReview, int id)
  {
    Review reviewToUpdate = _dbContext.Reviews.SingleOrDefault(r => r.Id == id);
    if (reviewToUpdate == null)
    {
      return NotFound();
    }
    //update the properties that we want to change. 
    reviewToUpdate.Content = updatedReview.Content;
    reviewToUpdate.Rating = updatedReview.Rating;
    _dbContext.SaveChanges();
    return NoContent();
  }

  [HttpGet("{userId}/user")]
  [Authorize]
  public async Task<IActionResult> GetReviewsBasedOnUser(int userId)
  {
    var results = _dbContext.Reviews
    .Include(r => r.UserProfile)
    .Where((r) => r.UserProfileId == userId).OrderBy(r => r.DateAdded).ToList();
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
}