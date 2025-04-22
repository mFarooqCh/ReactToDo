using Microsoft.EntityFrameworkCore;
using ReactToDo.Models;

namespace ReactToDo.Data;

public class ToDoDbContext(DbContextOptions<ToDoDbContext> options) : DbContext(options)
{
    public DbSet<ToDoList> ToDoLists { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDoList>().Property(t => t.Status)
            .HasConversion<string>();
    }
}