using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactToDo.Data;
using ReactToDo.Models;

namespace ReactToDo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController(ILogger<DataController> logger, ToDoDbContext context) : ControllerBase
{
    private readonly ILogger<DataController> _logger = logger;

    [HttpGet]
    public IActionResult Home()
    {
        return Ok(new { message = "Hello from API!" });
    }

    [HttpGet("todos")]
    public async Task<IActionResult> GetTodos()
    {
        return Ok(await context.ToDoLists.ToListAsync());
    }

    [HttpPost("todos")]
    public async Task<IActionResult> CreateTodo([FromBody] ToDoList todo)
    {
        await context.ToDoLists.AddAsync(todo);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodos), todo);
    }

    [HttpPut("todos/{id}")]
    public async Task<IActionResult> UpdateTodo(Guid id, [FromBody] ToDoList todo)
    {
        var existing = await context.ToDoLists.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = todo.Title;
        existing.Description = todo.Description;
        existing.Status = todo.Status;
        
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("todos/{id}")]
    public async Task<IActionResult> DeleteTodo(Guid id)
    {
        var todo = await context.ToDoLists.FindAsync(id);
        if (todo == null) return NotFound();

        context.ToDoLists.Remove(todo);
        await context.SaveChangesAsync();
        return NoContent();
    }
}