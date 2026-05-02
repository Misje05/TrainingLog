using System.ComponentModel.DataAnnotations;

namespace TrainingLog.DTOs;

public class CreateWorkoutSessionDto
{
    [Required]
    public DateTime Date { get; set; }

    [Required]
    [MaxLength(100)]
    public string Type { get; set; } = string.Empty;

    [Required]
    [Range(1, 600)]
    public int DurationMinutes { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }
}