namespace TrainingLog.DTOs;

public class WorkoutSessionResponseDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } = string.Empty; // for example "Running" or "Gym"
    public int DurationMinutes { get; set; }
    public string? Notes { get; set; } // optional notes about the workout
}