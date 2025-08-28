# JavaScript DOM & Events 

## 1. Difference between getElementById, getElementsByClassName, and querySelector/querySelectorAll

**getElementById()**
- Selects a single element by its unique ID
- Returns: Single element or null
- Fastest method for ID selection

**getElementsByClassName()**
- Selects multiple elements by class name
- Returns: Live HTMLCollection (updates automatically)
- Can return multiple elements

**querySelector()**
- Selects the first element matching CSS selector
- Returns: Single element or null
- Most flexible (any CSS selector)

**querySelectorAll()**
- Selects all elements matching CSS selector
- Returns: Static NodeList (doesn't update automatically)
- Most versatile for complex selections

## 2. How to create and insert a new element into the DOM

**Create element:**
```javascript
const newElement = document.createElement('div');
newElement.textContent = 'Hello World';
newElement.className = 'my-class';
```

**Insert methods:**
- `parent.appendChild(element)` - adds at end
- `parent.prepend(element)` - adds at beginning  
- `parent.insertBefore(newElement, referenceElement)` - inserts before specific element
- `element.insertAdjacentElement(position, newElement)` - flexible positioning

## 3. What is Event Bubbling and how does it work?

**Event Bubbling:** Events propagate upward from the target element through its ancestors in the DOM tree.

**How it works:**
1. Event occurs on target element
2. Event handlers on target execute
3. Event bubbles up to parent element
4. Parent event handlers execute
5. Continues up to document root

**Example:** Clicking a button inside a div inside body triggers handlers on:
1. Button → 2. Div → 3. Body → 4. Document

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation:** Using a single event listener on a parent element to handle events for multiple child elements.

**Why useful:**
-  Better performance (fewer event listeners)
-  Works with dynamically added elements
-  Memory efficient
-  Cleaner code structure

**Example:**
```javascript
document.getElementById('list').addEventListener('click', function(e) {
  if (e.target.classList.contains('item')) {
    console.log('List item clicked:', e.target.textContent);
  }
});
```

## 5. Difference between preventDefault() and stopPropagation() methods

**preventDefault()**
- Prevents the browser's default behavior
- Example: Stop form submission, prevent link navigation
- Doesn't affect event propagation

**stopPropagation()**
- Stops the event from bubbling up the DOM tree
- Prevents parent handlers from executing
- Doesn't prevent default behavior

**Common combination:**
```javascript
element.addEventListener('click', function(e) {
  e.preventDefault();  // Stop default action
  e.stopPropagation(); // Stop bubbling
});
```