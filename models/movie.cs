namespace MovieMatch.Models;
using System.Text.Json.Serialization;


public class Movie
{
  [JsonPropertyName("id")]
  public int Id { get; set; }
  public string Title { get; set; }
  public string Overview { get; set; }
  public DateTime ReleaseDate { get; set; }
  public string PosterPath { get; set; }
  public string OriginalLanguage { get; set; }
  public decimal VoteAverage { get; set; }
  public decimal Popularity { get; set; }
  public decimal RunTime { get; set; }
  public decimal Revenue { get; set; }
  public string Tagline { get; set; }
  public decimal Budget { get; set; }
  //ask about genres?
  public List<Genre> Genres { get; set; }
};