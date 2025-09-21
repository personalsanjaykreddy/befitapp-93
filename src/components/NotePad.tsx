import { useState, useEffect } from "react";
import { Plus, X, Trash2, Check, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Note {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: Date;
  type: 'note' | 'todo';
}

interface NotePadProps {
  onBack: () => void;
}

const NotePad = ({ onBack }: NotePadProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'todo' | 'notes'>('todo');
  const [newNote, setNewNote] = useState({ title: '', content: '', type: 'todo' as 'note' | 'todo' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userNotes');
    if (saved) {
      const parsedNotes = JSON.parse(saved).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt)
      }));
      setNotes(parsedNotes);
    }

    // Load saved meals from meal planner
    const savedMeals = localStorage.getItem('savedMeals');
    if (savedMeals) {
      const meals = JSON.parse(savedMeals);
      const mealNotes = meals.map((meal: any) => ({
        id: `meal-${meal.id}`,
        title: `Meal: ${meal.name}`,
        content: `Calories: ${meal.calories}, Protein: ${meal.protein}g, Carbs: ${meal.carbs}g`,
        completed: false,
        createdAt: new Date(),
        type: 'note'
      }));
      setNotes(prev => [...prev, ...mealNotes]);
    }
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('userNotes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = () => {
    if (!newNote.title.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      completed: false,
      createdAt: new Date(),
      type: activeTab === 'todo' ? 'todo' : 'note'
    };
    
    const updatedNotes = [note, ...notes];
    saveNotes(updatedNotes);
    setNewNote({ title: '', content: '', type: 'todo' });
    setIsAdding(false);
  };

  const toggleTodo = (id: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(note => note.type === activeTab);
  const completedTodos = notes.filter(note => note.type === 'todo' && note.completed).length;
  const totalTodos = notes.filter(note => note.type === 'todo').length;

  return (
    <div className="flex-1 bg-gradient-hero overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Notes</h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'todo' 
                ? `${completedTodos}/${totalTodos} tasks completed` 
                : `${filteredNotes.length} notes saved`}
            </p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Tabs */}
        <div className="flex bg-card rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab('todo')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'todo' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            To-Do List
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'notes' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Notes
          </button>
        </div>

        {/* Add New Button */}
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full mb-4 bg-gradient-primary text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {activeTab === 'todo' ? 'Task' : 'Note'}
          </Button>
        )}

        {/* Add New Form */}
        {isAdding && (
          <Card className="p-4 mb-4 bg-gradient-card border border-border/50">
            <div className="space-y-3">
              <Input
                placeholder={activeTab === 'todo' ? 'Task title...' : 'Note title...'}
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              />
              {activeTab === 'notes' && (
                <Textarea
                  placeholder="Note content..."
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                />
              )}
              <div className="flex gap-2">
                <Button onClick={addNote} size="sm">
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Notes List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No {activeTab === 'todo' ? 'tasks' : 'notes'} yet</p>
              <p className="text-sm">Click the button above to add your first {activeTab === 'todo' ? 'task' : 'note'}</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <Card key={note.id} className="p-4 bg-gradient-card border border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {activeTab === 'todo' && (
                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => toggleTodo(note.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            note.completed 
                              ? 'bg-success border-success text-success-foreground' 
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {note.completed && <Check className="w-3 h-3" />}
                        </button>
                        <h3 className={`font-medium ${
                          note.completed 
                            ? 'text-muted-foreground line-through' 
                            : 'text-foreground'
                        }`}>
                          {note.title}
                        </h3>
                      </div>
                    )}
                    
                    {activeTab === 'notes' && (
                      <>
                        <h3 className="font-medium text-foreground mb-1">{note.title}</h3>
                        {note.content && (
                          <p className="text-sm text-muted-foreground">{note.content}</p>
                        )}
                      </>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {note.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => deleteNote(note.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotePad;