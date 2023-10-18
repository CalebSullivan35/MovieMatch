namespace MovieMatch.Models;

using System;
using System.Text.Json.Serialization;


public class Movie
{
  [JsonPropertyName("id")]
  public int Id { get; set; }
  public string Title { get; set; }
  public string Overview { get; set; }
  public string ReleaseDate { get; set; }
  public string PosterPath { get; set; }
  public string OriginalLanguage { get; set; }
  public double VoteAverage { get; set; }
  public double Popularity { get; set; }
  public double RunTime { get; set; }
  public double Revenue { get; set; }
  public string Tagline { get; set; }
  public decimal Budget { get; set; }
  //ask about genres?
  public List<Genre> Genres { get; set; }

    
};