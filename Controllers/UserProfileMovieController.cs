using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using MovieMatch.Data;
using MovieMatch.Models;
using TmdbEasy.Interfaces;

namespace MovieMatch.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileMovieController : ControllerBase
{
  private MovieMatchDbContext _dbcontent;
  private readonly IMovieApi _movieApi;


  public UserProfileMovieController(MovieMatchDbContext context, IMovieApi movieApi)
  {
    _dbcontent = context;
    _movieApi = movieApi;
  }

  //get the list of relationships based on user id
  [HttpGet("{id}")]
  // [Authorize]
  public async Task<IActionResult> getRelationshipsFromUserId(int id)
  {
    //create a list of all the userprofile movies
    var userProfileMoviesToReturn = _dbcontent.UserProfileMovies.Where((upm) => upm.UserProfileId == id).ToList();
    //for each movie in the list we will need to fetch and expand the movie.dmn.
    if (userProfileMoviesToReturn == null)
    {
      return NotFound();
    }
    //append the movie to the object
    foreach(UserProfileMovie upm in userProfileMoviesToReturn)
    {
      var apiMovie = await _movieApi.GetDetailsAsync(upm.MatchingMovieInteger);

      List<Genre> genresToAdd = new List<Genre>();

      foreach (var genre in apiMovie.Genres)
      {
        Genre genreToAdd = new Genre
        {
          Id = genre.Id,
          Name = genre.Name
        };
        genresToAdd.Add(genreToAdd);
      }
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
        Genres = genresToAdd
      };
      upm.Movie = foundMovie;
    };
    //return the list of objects. 
    return Ok(userProfileMoviesToReturn);
  }
  //post a new relationship
  [HttpPost]
  [Authorize]
  public IActionResult postRelationship(UserProfileMovie newUserProfileMovie)
  {
    _dbcontent.UserProfileMovies.Add(newUserProfileMovie);
    _dbcontent.SaveChanges();
    return Created($"/api/UserProfileMovie/{newUserProfileMovie.Id}",newUserProfileMovie);
  }

  //delete a relationship
  [HttpDelete("${id}/delete")]
  [Authorize]
  public IActionResult deleteRelationship(int id)
  {
    UserProfileMovie userProfileMovieToDelete = _dbcontent.UserProfileMovies.SingleOrDefault(usp => usp.Id == id);
    if (userProfileMovieToDelete == null)
    {
      return NotFound();
    }
    _dbcontent.UserProfileMovies.Remove(userProfileMovieToDelete);
    _dbcontent.SaveChanges();
    return NoContent();
  }
}