using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrainingLog.Data;
using TrainingLog.DTOs;
using TrainingLog.Models;

namespace TrainingLog.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkoutSessionsController : ControllerBase 
{
	private readonly AppDbContext _db;

	public WorkoutSessionsController(AppDbContext db)
	{
		_db = db;
	}

	// GET /api/workoutsessions
	[HttpGet]
	public async Task<ActionResult<IEnumerable<WorkoutSessionResponseDto>>> GetAll()
	{
		var sessions = await _db.WorkoutSessions.ToListAsync();
		return Ok(sessions.Select(ToDto));
	}

	// GET /api/workoutsessions/{id}
	[HttpGet("{id}")]
	public async Task<ActionResult<WorkoutSessionResponseDto>> GetById(int id)
	{
		var session = await _db.WorkoutSessions.FindAsync(id);
		if (session == null) return NotFound();
		return Ok(ToDto(session));
	}

	// POST /api/workoutsessions
	[HttpPost]
	public async Task<ActionResult<WorkoutSessionResponseDto>> Create(CreateWorkoutSessionDto dto)
	{
		var session = new WorkoutSession()
		{
			Date = dto.Date,
			Type = dto.Type,
			DurationMinutes = dto.DurationMinutes,
			Notes = dto.Notes
		};

		_db.WorkoutSessions.Add(session);
		await _db.SaveChangesAsync();

		return CreatedAtAction(nameof(GetById), new { id = session.Id }, ToDto(session));
	}

	// PUT /api/workoutsessions/{id}
	[HttpPut("{id}")]
	public async Task<IActionResult> Update(int id, CreateWorkoutSessionDto dto)
	{
		var session = await _db.WorkoutSessions.FindAsync(id);
		if (session == null) return NotFound();

		session.Date = dto.Date;
		session.Type = dto.Type;
		session.DurationMinutes = dto.DurationMinutes;
		session.Notes = dto.Notes;

		await _db.SaveChangesAsync();
		return NoContent();
	}

	// DELETE /api/workoutsessions/{id}
	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(int id)
	{
		var session = await _db.WorkoutSessions.FindAsync(id);
		if (session == null) return NotFound();

		_db.WorkoutSessions.Remove(session);
		await _db.SaveChangesAsync();
		return NoContent();
	}

	private static WorkoutSessionResponseDto ToDto(WorkoutSession s) => new() 
	{		
		Id = s.Id,
		Date = s.Date,
		Type = s.Type,
		DurationMinutes = s.DurationMinutes,
		Notes = s.Notes	
	};
}