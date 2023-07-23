class Todo {
  constructor(todoText: string) {
      this.text = todoText;
      this.id = new Date().toISOString();
  }
  id: string;
  text: string;
}

export default Todo;