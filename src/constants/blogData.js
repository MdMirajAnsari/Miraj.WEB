export const blogPosts = {
  1: {
    id: 1,
    title: 'C# Concepts - Complete Guide',
    excerpt: 'Comprehensive guide covering C# fundamentals, advanced features, threading, async programming, and best practices for .NET developers.',
    date: 'Jan 26, 2024',
    category: 'C# / .NET',
    readTime: 45,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    author: 'Miraj',
    content: `
      <h2>Version</h2>
      <h3>Latest Version- C# 13, .NET 9</h3>
      <p>It was officially released for General Availability in Nov, 2024 with the announcement of .NET 9 and C# 13. Key features include:</p>
      <ul>
        <li><strong>Native AOT (Ahead-of-Time Compilation)</strong></li>
        <li><strong>Runtime Optimizations</strong></li>
        <li><strong>Dynamic Garbage Collection</strong></li>
        <li><strong>Params Collections</strong></li>
        <li><strong>New Lock Type</strong></li>
        <li><strong>New Escape Sequence \\e</strong></li>
        <li><strong>Init Array with Index from the End Operator ^</strong></li>
        <li><strong>Relaxed Constraints on ref struct and ref variables</strong></li>
      </ul>

      <h3>C# 9 .NET 6</h3>
      <ul>
        <li>Top level statement</li>
        <li>Global Using</li>
        <li>Module Initializer</li>
        <li>Nullable References Types</li>
        <li>Null Propogation .?</li>
        <li>Record</li>
      </ul>

      <h2>Class and Objects</h2>
      <ul>
        <li><strong>Class</strong>: A blueprint describing properties/behaviors.</li>
        <li><strong>Object</strong>: An instance created from a class at runtime.</li>
      </ul>

      <pre><code>public class Car
{
    public string Model { get; set; }
    public void Start() => Console.WriteLine($"{Model} started");
}

var car = new Car { Model = "Civic" };
car.Start();</code></pre>

      <h2>Constructor</h2>
      <p>Special method used to initialize a new object's state.</p>
      <ul>
        <li><strong>Default constructor access modifier in C# = private</strong> (if not specified)</li>
        <li>Has no return type and shares the class name</li>
        <li>The compiler provides a default parameterless constructor if none is defined</li>
        <li>Fields have default values (numbers: 0, bool: false, reference: null)</li>
      </ul>

      <h3>Static Constructor</h3>
      <ul>
        <li>Cannot use access specifiers</li>
        <li>Public by default, access modifier can't be changed</li>
        <li>Execute only once when first object is created or class is first accessed</li>
        <li>Called implicitly, first block of code to run under a class</li>
        <li>Cannot be parameterized, so overloading is not possible</li>
      </ul>

      <h3>Private Constructor</h3>
      <ul>
        <li>Used to implement Singleton Design Pattern</li>
        <li>Prevents external instantiation</li>
        <li>Used when class contains only static members</li>
      </ul>

      <h2>Abstract Class vs Interface</h2>
      <h3>Abstract Class</h3>
      <ul>
        <li>Parent class that cannot be instantiated</li>
        <li>Can inherit from other class</li>
        <li>Abstract methods must be overridden in child class</li>
      </ul>

      <h3>Interface</h3>
      <ul>
        <li>Methods are default "public" and "abstract"</li>
        <li>Cannot create object of interface</li>
        <li>Cannot inherit from other class</li>
        <li>Supports explicit interface implementation</li>
      </ul>

      <h2>Polymorphism</h2>
      <ul>
        <li><strong>Compile Time</strong>: Method overloading, early binding</li>
        <li><strong>Run Time</strong>: Method Overriding, late binding</li>
      </ul>

      <h2>Garbage Collection</h2>
      <p>Garbage Collector is a feature provided by CLR that helps clean or destroy unused managed objects, reclaiming memory.</p>
      
      <h3>Generations</h3>
      <p>Generations define how long objects stay in memory:</p>
      <ul>
        <li><strong>Generation 2</strong>: Long-Lived Generation</li>
        <li><strong>Generation 1</strong>: Survival Generation</li>
        <li><strong>Generation 0</strong>: Short-Lived Generation</li>
      </ul>

      <h3>When GC gets triggered</h3>
      <ul>
        <li>When the "heap" is full or free space is too low</li>
        <li>When we call GC.Collect() explicitly</li>
      </ul>

      <h2>Value Type vs Reference Types</h2>
      <p><strong>Value Types</strong>: System.ValueType (struct, int, char)</p>
      <p><strong>Reference Types</strong>: System.Object (classes, delegate, string, array)</p>

      <h2>Stack and Heap Memory</h2>
      <h3>Stack Memory</h3>
      <ul>
        <li>Stores value types and method data</li>
        <li>Fast, fixed-size, scope-based</li>
        <li>Thread-specific, inherently thread-safe</li>
      </ul>

      <h3>Heap Memory</h3>
      <ul>
        <li>Stores reference types</li>
        <li>Dynamic, managed by Garbage Collector</li>
        <li>Slower, shared across threads, requires synchronization</li>
      </ul>

      <h2>Collections in C#</h2>
      <p>Collections are dynamic arrays that can:</p>
      <ul>
        <li>Increase size dynamically</li>
        <li>Insert elements in the middle</li>
        <li>Remove or delete elements from the middle</li>
      </ul>

      <h3>Types of Collections</h3>
      <ul>
        <li><strong>System.Collections</strong>: Non-generic (ArrayList, Hashtable, Queue, Stack)</li>
        <li><strong>System.Collections.Generic</strong>: Generic (List&lt;T&gt;, Dictionary&lt;TKey,TValue&gt;, Queue&lt;T&gt;)</li>
        <li><strong>System.Collections.Concurrent</strong>: Thread-safe collections</li>
      </ul>

      <h2>Const vs Readonly</h2>
      <ul>
        <li><strong>const</strong>: Can't be changed anywhere, compile-time constant</li>
        <li><strong>readonly</strong>: Can only be changed in constructor, runtime constant</li>
      </ul>

      <h2>Delegates</h2>
      <h3>Func Generic Delegate</h3>
      <p>Takes one or more input parameters and returns one output parameter. Can take up to 16 input parameters.</p>

      <h3>Action Generic Delegate</h3>
      <p>Takes one or more input parameters and returns nothing. Can take up to 16 input parameters.</p>

      <h3>Predicate Generic Delegate</h3>
      <p>Verifies certain criteria and returns Boolean. Takes one input parameter and always returns Boolean.</p>

      <h2>IEnumerable vs IQueryable</h2>
      <h3>IEnumerable</h3>
      <ul>
        <li>Executes in client memory</li>
        <li>Suitable for LINQ to Objects and in-memory data</li>
        <li>Best for small data sets</li>
      </ul>

      <h3>IQueryable</h3>
      <ul>
        <li>Executes on the data source</li>
        <li>Suitable for LINQ to SQL or Entity Framework</li>
        <li>Better performance for large data sets</li>
      </ul>

      <h2>Dependency Injection Types</h2>
      <ul>
        <li><strong>Constructor Injection</strong></li>
        <li><strong>Property Injection</strong></li>
        <li><strong>Method Injection</strong></li>
      </ul>

      <h2>Threading Concepts</h2>
      <h3>Concurrent vs Parallel</h3>
      <ul>
        <li><strong>Concurrent</strong>: Divide program into independent threads, execute in order-independent manner</li>
        <li><strong>Parallel</strong>: Execute multiple tasks simultaneously using multiple CPUs/cores</li>
      </ul>

      <h3>Thread vs Task</h3>
      <ul>
        <li><strong>Thread</strong>: Light-weight unit of execution within process</li>
        <li><strong>Task</strong>: Higher-level abstraction (async/await, parallelism, lightweight)</li>
        <li>In modern .NET, prefer Task unless you have a strong reason to use raw threads</li>
      </ul>

      <h3>Thread Pooling</h3>
      <p>Reuse of threads from a pool managed by CLR instead of creating new ones. Improves performance and reduces overhead.</p>

      <h3>Race Condition</h3>
      <p>Occurs when multiple threads access shared data simultaneously, and the final result depends on execution order.</p>
      
      <h4>Prevention Methods:</h4>
      <ul>
        <li>Locks</li>
        <li>Monitor</li>
        <li>Mutex</li>
        <li>Semaphores</li>
        <li>Interlocked operations</li>
      </ul>

      <h2>Async/Await</h2>
      <h3>Best Practices</h3>
      <ul>
        <li>Avoid blocking on async (.Result, .Wait()) - can cause deadlocks</li>
        <li>Use await all the way</li>
        <li>Consider ConfigureAwait(false) in library code</li>
        <li>Handle exceptions with try/catch around await</li>
      </ul>

      <h3>Async/Await vs Task.Run</h3>
      <ul>
        <li><strong>async/await</strong>: Language features for composing asynchronous operations, don't create threads</li>
        <li><strong>Task.Run</strong>: Schedules CPU-bound work on thread pool, use for CPU work, not I/O</li>
      </ul>

      <h2>Record Types</h2>
      <p>Records provide built-in value-based equality, immutability by default, and with-expressions.</p>
      <pre><code>public record Person(string Name, int Age);

var p1 = new Person("Ann", 30);
var p2 = new Person("Ann", 30);
Console.WriteLine(p1 == p2); // true (value equality)
var p3 = p1 with { Age = 31 }; // copy with change</code></pre>

      <h2>Nullable Reference Types (NRT)</h2>
      <p>Annotate reference types as nullable (string?) or non-nullable (string). Compiler warns about possible null misuse.</p>

      <h2>Parallel Programming</h2>
      <h3>Task Parallel Library (TPL)</h3>
      <pre><code>Parallel.For(0, 10, i =>
{
    Console.WriteLine($"Task {i} running on thread {Task.CurrentId}");
});</code></pre>

      <h3>PLINQ (Parallel LINQ)</h3>
      <pre><code>var numbers = Enumerable.Range(1, 1000);
var squares = numbers.AsParallel().Select(n => n * n).ToList();</code></pre>

      <h2>Access Modifiers</h2>
      <ul>
        <li><strong>protected internal</strong>: Accessible within same assembly OR from derived class</li>
        <li><strong>private protected</strong>: Accessible only within same assembly AND only by derived classes</li>
      </ul>

      <h3>Default Scopes</h3>
      <ul>
        <li>Top-level class: internal</li>
        <li>Class members: private</li>
        <li>Nested class: private</li>
      </ul>

      <h2>Ref, Out, and In Parameters</h2>
      <ul>
        <li><strong>ref</strong>: Variable must be initialized; method can read & modify</li>
        <li><strong>out</strong>: Variable doesn't need initialization; method must assign before returning</li>
        <li><strong>in</strong>: Variable must be initialized; method can only read (read-only reference)</li>
      </ul>

      <h2>Summary</h2>
      <p>This comprehensive guide covers essential C# concepts from basics to advanced topics. Master these concepts to become a proficient .NET developer. Keep practicing and exploring the .NET ecosystem!</p>
    `,
  },
  2: {
    id: 2,
    title: 'Building Scalable Web Applications with React',
    excerpt: 'Explore best practices for creating maintainable and scalable React applications using modern patterns and tools.',
    date: 'Jan 15, 2024',
    category: 'Web Development',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    author: 'Miraj',
    content: `
      <h2>Introduction</h2>
      <p>Building scalable web applications is crucial in today's fast-paced development environment. React has become the go-to library for creating interactive user interfaces, but scaling a React application requires careful planning and adherence to best practices.</p>
      
      <h2>Component Architecture</h2>
      <p>One of the key aspects of building scalable React applications is establishing a solid component architecture. This includes:</p>
      <ul>
        <li>Creating reusable, single-responsibility components</li>
        <li>Implementing proper state management strategies</li>
        <li>Using composition over inheritance</li>
        <li>Establishing clear component hierarchies</li>
      </ul>
      
      <h2>State Management</h2>
      <p>As your application grows, managing state becomes increasingly complex. Consider using state management solutions like Redux, Zustand, or React Context API based on your application's needs.</p>
      
      <h2>Performance Optimization</h2>
      <p>Performance is critical for scalability. Implement techniques such as:</p>
      <ul>
        <li>Code splitting and lazy loading</li>
        <li>Memoization with useMemo and useCallback</li>
        <li>Virtual scrolling for large lists</li>
        <li>Optimizing bundle size</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable React applications requires a combination of good architecture, proper state management, and performance optimization. By following these practices, you can create applications that grow with your needs.</p>
    `,
  },
  3: {
    id: 3,
    title: "The Future of JavaScript: What's Coming in ES2024",
    excerpt: 'A deep dive into the latest JavaScript features and how they will change the way we write code.',
    date: 'Jan 10, 2024',
    category: 'JavaScript',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    author: 'Miraj',
    content: `
      <h2>What's New in ES2024</h2>
      <p>JavaScript continues to evolve with exciting new features that make development more efficient and enjoyable. Let's explore what's coming in ES2024.</p>
      
      <h2>New Array Methods</h2>
      <p>ES2024 introduces powerful new array methods that simplify common operations:</p>
      <ul>
        <li>Array.prototype.toSorted() - Non-mutating sort</li>
        <li>Array.prototype.toReversed() - Non-mutating reverse</li>
        <li>Array.prototype.with() - Non-mutating element replacement</li>
      </ul>
      
      <h2>Pattern Matching</h2>
      <p>Pattern matching brings powerful capabilities from functional programming languages to JavaScript, making complex conditional logic more readable and maintainable.</p>
      
      <h2>Temporal API</h2>
      <p>The new Temporal API provides a modern approach to working with dates and times, addressing many of the issues with the legacy Date object.</p>
      
      <h2>Looking Ahead</h2>
      <p>These features represent just the beginning. JavaScript's evolution continues to focus on developer experience and performance.</p>
    `,
  },
  4: {
    id: 4,
    title: 'Mastering TypeScript for Better Code Quality',
    excerpt: 'Learn how TypeScript can help you write more robust code and catch bugs before they reach production.',
    date: 'Jan 5, 2024',
    category: 'TypeScript',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    author: 'Miraj',
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript has revolutionized the way we write JavaScript by adding static typing, which catches errors at compile time rather than runtime.</p>
      
      <h2>Type Safety Benefits</h2>
      <p>Type safety provides numerous advantages:</p>
      <ul>
        <li>Early error detection during development</li>
        <li>Better IDE support with autocomplete and refactoring</li>
        <li>Self-documenting code through type annotations</li>
        <li>Easier maintenance and collaboration</li>
      </ul>
      
      <h2>Advanced TypeScript Features</h2>
      <p>Master these advanced features to unlock TypeScript's full potential:</p>
      <ul>
        <li>Generic types for reusable components</li>
        <li>Utility types like Partial, Pick, and Omit</li>
        <li>Conditional types for complex logic</li>
        <li>Template literal types</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices to get the most out of TypeScript:</p>
      <ul>
        <li>Use strict mode for maximum type safety</li>
        <li>Avoid using 'any' type when possible</li>
        <li>Leverage type inference</li>
        <li>Create custom type guards</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>TypeScript is more than just adding types to JavaScript. It's a tool that helps you write better, more maintainable code and catch bugs before they become problems.</p>
    `,
  },
};
