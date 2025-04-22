namespace ReactToDo.Models;

public class ToDoList
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int SortingOrder { get; set; }
    public Status Status { get; set; }
}