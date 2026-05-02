export const blogPosts = {
  1: {
    id: 1,
    title: "C# Concepts - Complete Guide",
    excerpt:
      "Comprehensive guide covering C# fundamentals, advanced features, threading, async programming, and best practices for .NET developers.",
    date: "Jan 26, 2024",
    category: "C# / .NET",
    readTime: 45,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    content: `## Version

### Latest Version- C# 13, .NET 9

It was officially released for General Availability in Nov, 2024 with the announcement of .NET 9 and C# 13. Key features include:

- **Native AOT (Ahead-of-Time Compilation)**
- **Runtime Optimizations**
- **Dynamic Garbage Collection**
- **Params Collections**
- **New Lock Type**
- **New Escape Sequence \\e**
- **Init Array with Index from the End Operator ^**
- **Relaxed Constraints on ref struct and ref variables**

### C# 9 .NET 6

- Top level statement
- Global Using
- Module Initializer
- Nullable References Types
- Null Propogation .?
- Record

## Class and Objects

- **Class**: A blueprint describing properties/behaviors.
- **Object**: An instance created from a class at runtime.

\`\`\`csharp
public class Car
{
    public string Model { get; set; }
    public void Start() => Console.WriteLine($"{Model} started");
}

var car = new Car { Model = "Civic" };
car.Start();
\`\`\`

## Constructor

Special method used to initialize a new object's state.

- **Default constructor access modifier in C# = private** (if not specified)
- Has no return type and shares the class name
- The compiler provides a default parameterless constructor if none is defined
- Fields have default values (numbers: 0, bool: false, reference: null)

### Static Constructor

- Cannot use access specifiers
- Public by default, access modifier can't be changed
- Execute only once when first object is created or class is first accessed
- Called implicitly, first block of code to run under a class
- Cannot be parameterized, so overloading is not possible

### Private Constructor

- Used to implement Singleton Design Pattern
- Prevents external instantiation
- Used when class contains only static members

## Abstract Class vs Interface

### Abstract Class

- Parent class that cannot be instantiated
- Can inherit from other class
- Abstract methods must be overridden in child class

### Interface

- Methods are default "public" and "abstract"
- Cannot create object of interface
- Cannot inherit from other class
- Supports explicit interface implementation

## Polymorphism

- **Compile Time**: Method overloading, early binding
- **Run Time**: Method Overriding, late binding

## Garbage Collection

Garbage Collector is a feature provided by CLR that helps clean or destroy unused managed objects, reclaiming memory.

### Generations

Generations define how long objects stay in memory:

- **Generation 2**: Long-Lived Generation
- **Generation 1**: Survival Generation
- **Generation 0**: Short-Lived Generation

### When GC gets triggered

- When the "heap" is full or free space is too low
- When we call GC.Collect() explicitly

## Value Type vs Reference Types

**Value Types**: System.ValueType (struct, int, char)

**Reference Types**: System.Object (classes, delegate, string, array)

## Stack and Heap Memory

### Stack Memory

- Stores value types and method data
- Fast, fixed-size, scope-based
- Thread-specific, inherently thread-safe

### Heap Memory

- Stores reference types
- Dynamic, managed by Garbage Collector
- Slower, shared across threads, requires synchronization

## Collections in C#

Collections are dynamic arrays that can:

- Increase size dynamically
- Insert elements in the middle
- Remove or delete elements from the middle

### Types of Collections

- **System.Collections**: Non-generic (ArrayList, Hashtable, Queue, Stack)
- **System.Collections.Generic**: Generic (List<T>, Dictionary<TKey,TValue>, Queue<T>)
- **System.Collections.Concurrent**: Thread-safe collections

## Const vs Readonly

- **const**: Can't be changed anywhere, compile-time constant
- **readonly**: Can only be changed in constructor, runtime constant

## Delegates

### Func Generic Delegate

Takes one or more input parameters and returns one output parameter. Can take up to 16 input parameters.

### Action Generic Delegate

Takes one or more input parameters and returns nothing. Can take up to 16 input parameters.

### Predicate Generic Delegate

Verifies certain criteria and returns Boolean. Takes one input parameter and always returns Boolean.

## IEnumerable vs IQueryable

### IEnumerable

- Executes in client memory
- Suitable for LINQ to Objects and in-memory data
- Best for small data sets

### IQueryable

- Executes on the data source
- Suitable for LINQ to SQL or Entity Framework
- Better performance for large data sets

## Dependency Injection Types

- **Constructor Injection**
- **Property Injection**
- **Method Injection**

## Threading Concepts

### Concurrent vs Parallel

- **Concurrent**: Divide program into independent threads, execute in order-independent manner
- **Parallel**: Execute multiple tasks simultaneously using multiple CPUs/cores

### Thread vs Task

- **Thread**: Light-weight unit of execution within process
- **Task**: Higher-level abstraction (async/await, parallelism, lightweight)
- In modern .NET, prefer Task unless you have a strong reason to use raw threads

### Thread Pooling

Reuse of threads from a pool managed by CLR instead of creating new ones. Improves performance and reduces overhead.

### Race Condition

Occurs when multiple threads access shared data simultaneously, and the final result depends on execution order.

#### Prevention Methods:

- Locks
- Monitor
- Mutex
- Semaphores
- Interlocked operations

## Async/Await

### Best Practices

- Avoid blocking on async (.Result, .Wait()) - can cause deadlocks
- Use await all the way
- Consider ConfigureAwait(false) in library code
- Handle exceptions with try/catch around await

### Async/Await vs Task.Run

- **async/await**: Language features for composing asynchronous operations, don't create threads
- **Task.Run**: Schedules CPU-bound work on thread pool, use for CPU work, not I/O

## Record Types

Records provide built-in value-based equality, immutability by default, and with-expressions.

\`\`\`csharp
public record Person(string Name, int Age);

var p1 = new Person("Ann", 30);
var p2 = new Person("Ann", 30);
Console.WriteLine(p1 == p2); // true (value equality)
var p3 = p1 with { Age = 31 }; // copy with change
\`\`\`

## Nullable Reference Types (NRT)

Annotate reference types as nullable (string?) or non-nullable (string). Compiler warns about possible null misuse.

## Parallel Programming

### Task Parallel Library (TPL)

\`\`\`csharp
Parallel.For(0, 10, i =>
{
    Console.WriteLine($"Task {i} running on thread {Task.CurrentId}");
});
\`\`\`

### PLINQ (Parallel LINQ)

\`\`\`csharp
var numbers = Enumerable.Range(1, 1000);
var squares = numbers.AsParallel().Select(n => n * n).ToList();
\`\`\`

## Access Modifiers

- **protected internal**: Accessible within same assembly OR from derived class
- **private protected**: Accessible only within same assembly AND only by derived classes

### Default Scopes

- Top-level class: internal
- Class members: private
- Nested class: private

## Ref, Out, and In Parameters

- **ref**: Variable must be initialized; method can read & modify
- **out**: Variable doesn't need initialization; method must assign before returning
- **in**: Variable must be initialized; method can only read (read-only reference)

## Summary

This comprehensive guide covers essential C# concepts from basics to advanced topics. Master these concepts to become a proficient .NET developer. Keep practicing and exploring the .NET ecosystem!
    `,
  },
  2: {
    id: 2,
    title: "Building Scalable Web Applications with React",
    excerpt:
      "Explore best practices for creating maintainable and scalable React applications using modern patterns and tools.",
    date: "Jan 15, 2024",
    category: "Web Development",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: "Miraj",
    content: `## Introduction

Building scalable web applications is crucial in today's fast-paced development environment. React has become the go-to library for creating interactive user interfaces, but scaling a React application requires careful planning and adherence to best practices.

## Component Architecture

One of the key aspects of building scalable React applications is establishing a solid component architecture. This includes:

- Creating reusable, single-responsibility components
- Implementing proper state management strategies
- Using composition over inheritance
- Establishing clear component hierarchies

## State Management

As your application grows, managing state becomes increasingly complex. Consider using state management solutions like Redux, Zustand, or React Context API based on your application's needs.

## Performance Optimization

Performance is critical for scalability. Implement techniques such as:

- Code splitting and lazy loading
- Memoization with useMemo and useCallback
- Virtual scrolling for large lists
- Optimizing bundle size

## Conclusion

Building scalable React applications requires a combination of good architecture, proper state management, and performance optimization. By following these practices, you can create applications that grow with your needs.
    `,
  },
  3: {
    id: 3,
    title: "The Future of JavaScript: What's Coming in ES2024",
    excerpt:
      "A deep dive into the latest JavaScript features and how they will change the way we write code.",
    date: "Jan 10, 2024",
    category: "JavaScript",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    author: "Miraj",
    content: `## What's New in ES2024

JavaScript continues to evolve with exciting new features that make development more efficient and enjoyable. Let's explore what's coming in ES2024.

## New Array Methods

ES2024 introduces powerful new array methods that simplify common operations:

- Array.prototype.toSorted() - Non-mutating sort
- Array.prototype.toReversed() - Non-mutating reverse
- Array.prototype.with() - Non-mutating element replacement

## Pattern Matching

Pattern matching brings powerful capabilities from functional programming languages to JavaScript, making complex conditional logic more readable and maintainable.

## Temporal API

The new Temporal API provides a modern approach to working with dates and times, addressing many of the issues with the legacy Date object.

## Looking Ahead

These features represent just the beginning. JavaScript's evolution continues to focus on developer experience and performance.
    `,
  },
  4: {
    id: 4,
    title: "Mastering TypeScript for Better Code Quality",
    excerpt:
      "Learn how TypeScript can help you write more robust code and catch bugs before they reach production.",
    date: "Jan 5, 2024",
    category: "TypeScript",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    author: "Miraj",
    content: `## Why TypeScript?

TypeScript has revolutionized the way we write JavaScript by adding static typing, which catches errors at compile time rather than runtime.

## Type Safety Benefits

Type safety provides numerous advantages:

- Early error detection during development
- Better IDE support with autocomplete and refactoring
- Self-documenting code through type annotations
- Easier maintenance and collaboration

## Advanced TypeScript Features

Master these advanced features to unlock TypeScript's full potential:

- Generic types for reusable components
- Utility types like Partial, Pick, and Omit
- Conditional types for complex logic
- Template literal types

## Best Practices

Follow these best practices to get the most out of TypeScript:

- Use strict mode for maximum type safety
- Avoid using 'any' type when possible
- Leverage type inference
- Create custom type guards

## Conclusion

TypeScript is more than just adding types to JavaScript. It's a tool that helps you write better, more maintainable code and catch bugs before they become problems.
    `,
  },
  5: {
    id: 5,
    title: ".NET Coding Standards & Best Practices",
    excerpt:
      "A complete guide to writing clean, maintainable, and professional .NET code using proper naming conventions and project structure.",
    date: "Apr 13, 2026",
    category: "C# / .NET",
    readTime: 25,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    content: `## Introduction

Writing clean and consistent code is critical in any **.NET project**. Following proper naming conventions improves readability, maintainability, and team collaboration.

## Why Coding Standards?

- Improves readability of code
- Makes debugging easier
- Ensures consistency across the project
- Helps new developers understand code quickly

## General Naming Conventions

---

| Element | Convention | Example |
|---------|-----------|---------|
| Local Variables | camelCase | totalCount |
| Properties | PascalCase | FirstName |
| Methods | PascalCase | GetUser() |
| Classes | PascalCase | UserService |
| Interfaces | I + PascalCase | IUserService |
| Private Fields | _camelCase | _logger |

## Local Variables (camelCase)

---

\`\`\`csharp
int totalCount = 0;
string userName = "Miraj";
decimal orderAmount = 1000;
\`\`\`

## Properties & Methods (PascalCase)

\`\`\`csharp
public class Employee
{
    public string FirstName { get; set; }
    public bool IsActive { get; set; }

    public void SaveEmployee()
    {
        Console.WriteLine("Saved");
    }
}
\`\`\`

## Boolean Variables (Important)

Always write boolean variables as questions or conditions.

### Good Examples

\`\`\`csharp
bool isActive = true;
bool hasAccess = false;
bool canEdit = true;
bool shouldRetry = false;
\`\`\`

### Bad Examples

\`\`\`csharp
bool active = true;
bool flag = false;
\`\`\`

## Private Fields

\`\`\`csharp
private readonly ILogger _logger;
private readonly IUserService _userService;
\`\`\`

## Interfaces

\`\`\`csharp
public interface IUserService
{
    void CreateUser();
}
\`\`\`

## Constants

\`\`\`csharp
public const int MaxRetryCount = 3;
public const string DefaultRole = "User";
\`\`\`

## Async Method Naming

\`\`\`csharp
public async Task SaveUserAsync()
{
    await Task.Delay(100);
}
\`\`\`

## Project Structure (Recommended)

- **Controllers** → Handle HTTP requests
- **Services** → Business logic
- **Repositories** → Database access
- **Models** → Data structures
- **DTOs** → Data transfer objects

### Example Structure

\`\`\`
MyProject/
 ├── Controllers/
 ├── Services/
 ├── Repositories/
 ├── Models/
 ├── DTOs/
 └── Program.cs
\`\`\`

## Complete Example

\`\`\`csharp
public class CustomerService : ICustomerService
{
    private readonly ILogger _logger;

    public string ServiceName { get; set; }
    public bool IsEnabled { get; set; }

    public CustomerService(ILogger logger)
    {
        _logger = logger;
    }

    public bool CreateCustomer(string customerName, bool isActive)
    {
        bool isCreated = false;

        if (!string.IsNullOrWhiteSpace(customerName) && isActive)
        {
            isCreated = true;
            _logger.Log("Customer created successfully");
        }

        return isCreated;
    }
}
\`\`\`

## Best Practices

---

- Use meaningful variable names
- Avoid magic numbers
- Keep methods small and focused
- Follow SOLID principles
- Use dependency injection

## Summary

Following proper naming conventions and project structure in .NET ensures your code is clean, scalable, and easy to maintain. These practices are essential for professional development and team collaboration.
    `,
  },
  6: {
    id: 6,
    title: "Angular Component Communication: Parent-Child Data Flow",
    excerpt:
      "Master passing data from child to parent components in Angular using @Output, EventEmitter, and @ViewChild decorators.",
    date: "May 01, 2026",
    category: "Angular",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    author: "Miraj",
    content: `## 1. Pass data from a child component to a parent component.

### Using @Output and EventEmitter (Recommended)

The @Output decorator allows a child component to emit custom events that the parent component can listen to, enabling data to be passed from child to parent.

#### Child Component

\`\`\`typescript
// child.component.ts

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: \`
    <button (click)="sendData()">Send Data to Parent</button>
  \`
})
export class ChildComponent {
  @Output() dataEvent = new EventEmitter<string>(); // Define Output event

  sendData() {
    this.dataEvent.emit('Hello from Child!'); // Emit data to parent
  }
}
\`\`\`

#### Parent Component

\`\`\`typescript
// parent.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: \`
    <app-child (dataEvent)="receiveData($event)"></app-child>
    <p>Received: {{ message }}</p>
  \`
})
export class ParentComponent {
  message: string;

  receiveData(data: string) {
    this.message = data; // Handle data from child
  }
}
\`\`\`

#### Explanation

- The child component declares an @Output property (dataEvent) using EventEmitter
- The child calls emit() to send data (e.g., a string, object, or any type)
- The parent listens to the dataEvent event using event binding \`(dataEvent)="receiveData($event)"\` and processes the emitted data

**Use Case:** Ideal for most scenarios where the child needs to notify the parent of an event or send data, such as button clicks, form submissions, or state changes.

### Using ViewChild to Access Child Component

The parent can directly access the child component's properties or methods using @ViewChild, allowing it to retrieve data.

#### Child Component

\`\`\`typescript
// child.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: \`<button (click)="updateData()">Update Data</button>\`
})
export class ChildComponent {
  childData: string = 'Initial Child Data';

  updateData() {
    this.childData = 'Updated Child Data';
  }
}
\`\`\`

#### Parent Component

\`\`\`typescript
// parent.component.ts

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: \`<app-child></app-child><p>Child Data: {{ childData }}</p>\`
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) child: ChildComponent;
  childData: string;

  ngAfterViewInit() {
    this.childData = this.child.childData; // Access child data
  }
}
\`\`\`

#### Explanation

- The parent uses @ViewChild to get a reference to the child component
- After the view is initialized (ngAfterViewInit), the parent can access the child's properties or methods
- **Caution:** This tightly couples the parent and child, which may not be ideal for reusable components

**Use Case:** Suitable for scenarios where the parent needs direct access to the child's state, but use sparingly to maintain loose coupling.
    `,
  },
  7: {
    id: 7,
    title: "Angular Advanced Concepts: RxJS, Lifecycle Hooks & Data Binding",
    excerpt:
      "Deep dive into Angular advanced topics including mergeMap, concatMap, switchMap, BehaviorSubject, lifecycle hooks, and data binding patterns.",
    date: "May 01, 2026",
    category: "Angular",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    author: "Miraj",
    content: `## Differences between mergeMap, concatMap, and switchMap

### 1. mergeMap

**Behavior:** Flattens multiple inner Observables and subscribes to them concurrently. All results are emitted as they complete, regardless of order.

**When to Use:** Use when you want to process multiple API calls in parallel and collect all results.

**Drawback:** No guaranteed order of results; can be resource-intensive if many Observables are active simultaneously.

**Example:**

\`\`\`typescript
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

const source = of(1, 2, 3);
source.pipe(
  mergeMap(val => of(\`API call for \${val}\`).pipe(delay(1000 - val * 100)))
).subscribe(result => console.log(result));
\`\`\`

**Output (order depends on completion time):**
- API call for 3
- API call for 2
- API call for 1

Here, mergeMap runs all API calls concurrently, and results are emitted as they arrive (faster calls complete first).

### 2. concatMap

**Behavior:** Maps each value to an Observable and subscribes to them one at a time, waiting for the current inner Observable to complete before subscribing to the next. Maintains the order of the source Observable.

**When to Use:** Use for sequential API calls where the order of execution and results matters, or when the second API depends on the first completing.

**Drawback:** Slower, as it waits for each inner Observable to complete before moving to the next.

**Example:**

\`\`\`typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  template: \`<p>{{ data$ | async | json }}</p>\`
})
export class ExampleComponent {
  data$;
  constructor(private http: HttpClient) {
    this.data$ = this.http.get<{ userId: number }>('https://api.example.com/user').pipe(
      concatMap(user => this.http.get(\`https://api.example.com/user/\${user.userId}/details\`))
    );
  }
}
\`\`\`

**Behavior:** The first API (/user) is called, and only after it completes does the second API (/user/{userId}/details) start. Results are emitted in the order of the source Observable.

### 3. switchMap

**Behavior:** Maps each value to an Observable and subscribes to the latest one, canceling any previous in-flight Observables if a new value is emitted.

**When to Use:** Use when you only care about the latest result, such as in search-as-you-type scenarios or when a new API call invalidates previous ones.

**Drawback:** Cancels previous requests, so you may lose results from earlier Observables.

**Example:**

\`\`\`typescript
import { of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

const source = of(1, 2, 3);
source.pipe(
  switchMap(val => of(\`API call for \${val}\`).pipe(delay(1000)))
).subscribe(result => console.log(result));
\`\`\`

**Output:** Only the result of the last emission (3) is logged because switchMap cancels previous Observables when a new value arrives.

---

## BehaviorSubject

A BehaviorSubject in Angular (part of the RxJS library) is a special type of Subject that holds a current value and emits it to new subscribers immediately upon subscription. Unlike a regular Subject, it always has a value, even if no events have been emitted yet, making it useful for representing state that components can rely on.

### Key Characteristics of BehaviorSubject

- **Initial Value:** Requires an initial value when created
- **Current Value Access:** Subscribers get the most recent value (or initial value) immediately upon subscription
- **Multiple Subscribers:** Like other Subjects, it supports multiple subscribers, and all receive the same value when next() is called
- **State Management:** Often used to hold and share state (e.g., user data, form state) across components

### Common Methods

- **next(value):** Emits a new value to all subscribers
- **getValue():** Retrieves the current value of the BehaviorSubject
- **subscribe():** Allows components to subscribe to value changes
- **asObservable():** Converts the BehaviorSubject to an Observable to prevent external code from calling next()

### Use Cases

- **State Management:** Share application state (e.g., user authentication status, theme settings)
- **Form Data:** Track form input changes across components
- **Real-Time Updates:** Reflect changes like notifications or live data feeds

---

## Lifecycle Hooks

Angular provides various lifecycle hooks that allow you to run code during different phases of a component or directive's lifecycle.

### Common Lifecycle Hooks

- **OnChanges:** Fired when one or more of the component or directive properties have been changed
- **OnInit:** Fired when component or directive properties have been initialized
- **OnDestroy:** Fired when the component or directive instance is destroyed
- **AfterContentInit:** Fired after the initialization of the content of the component or directive has finished
- **AfterContentChecked:** Fired after the view has been fully initialized
- **AfterViewInit:** Fires after initializing both the component view and any of its child views. Useful for plugins outside of the Angular ecosystem. For example, you could use this method to initialize a jQuery date picker based on the markup that Angular has rendered

---

## Data Binding

Data binding in Angular is a mechanism that synchronizes the data between the component (TypeScript) and the template (HTML). It enables dynamic updates to the UI when the underlying data changes and vice versa.

### Types of Data Binding

#### 1. Interpolation (One-Way: Component to View)

Uses double curly braces {{ }} to display component data in the template. Data flows from the component to the view.

\`\`\`typescript
// Component
export class AppComponent {
  title = 'Hello, Angular!';
}
\`\`\`

\`\`\`html
<!-- Template -->
<h1>{{ title }}</h1>
\`\`\`

**Output:** Displays "Hello, Angular!" in the UI.

#### 2. Property Binding (One-Way: Component to View)

Binds a component property to an HTML element property using square brackets [ ].

\`\`\`typescript
// Component
export class AppComponent {
  isDisabled = true;
}
\`\`\`

\`\`\`html
<!-- Template -->
<button [disabled]="isDisabled">Click me</button>
\`\`\`

**Output:** The button is disabled based on the isDisabled property.

#### 3. Event Binding (One-Way: View to Component)

Binds DOM events to component methods using parentheses ( ).

\`\`\`typescript
// Component
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
\`\`\`

\`\`\`html
<!-- Template -->
<button (click)="handleClick()">Click me</button>
\`\`\`

**Output:** Logs "Button clicked!" to the console when the button is clicked.

#### 4. Two-Way Binding

Combines property and event binding to synchronize data between component and view. Uses [(ngModel)] directive (requires FormsModule to be imported).

\`\`\`typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: \`<input [(ngModel)]="name" placeholder="Enter name">
             <p>You entered: {{ name }}</p>\`,
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {
  name = '';
}
\`\`\`

**Output:** The input field and the paragraph update simultaneously as the user types.

#### 5. Attribute Binding

Binds component data to HTML attributes (not properties) using [attr.].

\`\`\`typescript
// Component
export class AppComponent {
  colSpanValue = 2;
}
\`\`\`

\`\`\`html
<!-- Template -->
<td [attr.colspan]="colSpanValue">Spanning columns</td>
\`\`\`

**Output:** The \`<td>\` element spans 2 columns.

#### 6. Class and Style Binding

**Class Binding:**

\`\`\`typescript
export class AppComponent {
  isActive = true;
}
\`\`\`

\`\`\`html
<div [class.active]="isActive">Conditional Class</div>

<style>
  .active { background-color: lightblue; }
</style>
\`\`\`

**Output:** The div has a light blue background if isActive is true.

**Style Binding:**

\`\`\`html
<div [style.backgroundColor]="isActive ? 'lightblue' : 'white'">Conditional Style</div>
\`\`\`

### Key Points

- **One-Way Binding:** Data flows either from component to view (interpolation, property binding) or view to component (event binding)
- **Two-Way Binding:** Requires FormsModule for ngModel and is useful for form inputs
- **Performance:** Angular's change detection automatically updates the UI when bound data changes, but overuse of two-way binding can impact performance in large applications
- **Directives:** Structural directives like \*ngIf and \*ngFor often work with data binding to conditionally render or iterate over elements

---

## Angular Directives

Angular directives are special markers (attributes or elements) in the DOM that extend HTML functionality or manipulate the DOM in Angular applications. They allow you to attach behavior to elements, modify their structure, or create reusable components.

### Three Main Types of Directives

1. **Component Directives:** Defined using the @Component decorator, they encapsulate HTML, CSS, and TypeScript logic
2. **Structural Directives:** Identified by a leading asterisk (*) in templates (e.g., \*ngIf, \*ngFor, \*ngSwitch)
3. **Attribute Directives:** Modify the behavior or appearance of an element without altering the DOM structure (e.g., ngClass, ngStyle, ngModel)

### Common Examples

- **\*ngIf:** Conditionally renders elements
- **\*ngFor:** Iterates over a list
- **ngClass:** Dynamically applies CSS classes
- **ngStyle:** Applies inline styles dynamically
- **ngModel:** Two-way binding for forms

These directives make Angular powerful for building dynamic, interactive user interfaces.
    `,
  },
  8: {
    id: 8,
    title: "Angular Interview Notes",
    excerpt:
      "Angular interview preparation notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "Angular",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/ANGULAR/Angular.Md",
  },
  9: {
    id: 9,
    title: "C# Code Interview Notes",
    excerpt:
      "C# coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/C%23/C%23-Code.md",
  },
  10: {
    id: 10,
    title: "C# Concept Interview Notes",
    excerpt:
      "C# concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/C%23/C%23-Concept.md",
  },
  11: {
    id: 11,
    title: "OOP Concepts Interview Notes",
    excerpt:
      "Object-oriented programming concept notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/C%23/Oops-Concept.MD",
  },
  12: {
    id: 12,
    title: "CLI Interview Notes",
    excerpt:
      "Command-line interface interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "CLI",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/CLI/CLI.md",
  },
  13: {
    id: 13,
    title: "CSS Code Interview Notes",
    excerpt:
      "CSS coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "CSS",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/CSS/Css-Code.md",
  },
  14: {
    id: 14,
    title: "CSS Concept Interview Notes",
    excerpt:
      "CSS concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "CSS",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/CSS/Css-Concept.md",
  },
  15: {
    id: 15,
    title: "Data Structure Code Interview Notes",
    excerpt:
      "Data structure coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "Data Structures",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/DATA-STRUCTURE/DataStructure-Code.MD",
  },
  16: {
    id: 16,
    title: ".NET Concept Interview Notes",
    excerpt:
      ".NET concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/DOTNET/Dotnet-Concept.MD",
  },
  17: {
    id: 17,
    title: "Git Command Interview Notes",
    excerpt:
      "Git command notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "Git",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/GIT/GIT-Command.md",
  },
  18: {
    id: 18,
    title: "HTML Concept Interview Notes",
    excerpt:
      "HTML concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "HTML",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/HTML/Html-Concept.md",
  },
  19: {
    id: 19,
    title: "JavaScript Code Interview Notes",
    excerpt:
      "JavaScript coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "JavaScript",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/JAVASCRIPT/JavaScript-Code.md",
  },
  20: {
    id: 20,
    title: "JavaScript Concept Interview Notes",
    excerpt:
      "JavaScript concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "JavaScript",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/JAVASCRIPT/JavaScript-Concept.md",
  },
  21: {
    id: 21,
    title: "JavaScript Program Interview Notes",
    excerpt:
      "JavaScript program interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "JavaScript",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/JAVASCRIPT/JavaScript-Program.md",
  },
  22: {
    id: 22,
    title: "LINQ Code Interview Notes",
    excerpt:
      "LINQ coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/LINQ/Linq-Code.md",
  },
  23: {
    id: 23,
    title: "LINQ Concept Interview Notes",
    excerpt:
      "LINQ concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/LINQ/Linq-Concept.Md",
  },
  24: {
    id: 24,
    title: "Networking Command Interview Notes",
    excerpt:
      "Networking command notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "Networking",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/Networking/Networking-Commands.md",
  },
  25: {
    id: 25,
    title: "RxJS Concept Interview Notes",
    excerpt:
      "RxJS concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "Angular",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/RXJS/Rxjs-Concept.md",
  },
  26: {
    id: 26,
    title: "React Code Interview Notes",
    excerpt:
      "React coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "React",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/React/React-Code.md",
  },
  27: {
    id: 27,
    title: "React Concept Interview Notes",
    excerpt:
      "React concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "React",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/React/React-Concept.md",
  },
  28: {
    id: 28,
    title: "SQL Interview Notes",
    excerpt:
      "SQL interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "SQL",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/SQL%20SERVER/SQL.md",
  },
  29: {
    id: 29,
    title: "SQL Code Interview Notes",
    excerpt:
      "SQL coding interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "SQL",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/SQL%20SERVER/Sql-Code.md",
  },
  30: {
    id: 30,
    title: "SQL Concept Interview Notes",
    excerpt:
      "SQL concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "SQL",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/SQL%20SERVER/Sql-Concept.md",
  },
  31: {
    id: 31,
    title: "System Design Concept Interview Notes",
    excerpt:
      "System design concept interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "System Design",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/SystemDesign/SystemDesign-Concept.md",
  },
  32: {
    id: 32,
    title: "Types of JavaScript Interview Notes",
    excerpt:
      "JavaScript type notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "JavaScript",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/typeOfJS.md",
  },
  33: {
    id: 33,
    title: "Practical Clean Architecture",
    excerpt:
      "Practical Clean Architecture README loaded directly from its GitHub repository.",
    date: "May 01, 2026",
    category: "Architecture",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/phongnguyend/Practical.CleanArchitecture/blob/master/README.md",
  },
  34: {
    id: 34,
    title: "Code Practice Interview Notes",
    excerpt:
      "Code practice notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 01, 2026",
    category: "Coding Practice",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/CodePractice.md",
  },
  35: {
    id: 35,
    title: "Reference Architecture",
    excerpt:
      "Reference architecture notes loaded directly from the Reference-Architecture repository README.",
    date: "May 02, 2026",
    category: "Architecture",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/Reference-Architecture/blob/main/README.md",
  },
  36: {
    id: 36,
    title: ".NET L2 Interview Notes",
    excerpt:
      ".NET L2 interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 02, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/Dumps/Interview/dotnet_L2.MD",
  },
  37: {
    id: 37,
    title: ".NET L3 Interview Notes",
    excerpt:
      ".NET L3 interview notes loaded directly from a Markdown file in the InterviewNavigator repository.",
    date: "May 02, 2026",
    category: "C# / .NET",
    readTime: 20,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    author: "Miraj",
    markdownUrl:
      "https://github.com/MdMirajAnsari/InterviewNavigator/blob/main/Dumps/Interview/dotnet_L3.MD",
  },

};
