using System.ComponentModel.DataAnnotations;

namespace TrainingLog.Models;

public class WorkoutSession
{
    public int Id { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [MaxLength(100)]
    public string Type { get; set; } = string.Empty; // for example "Running" or "Gym"

    [Range(1, 600)]
    public int DurationMinutes { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; } // optional notes about the workout
}