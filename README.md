# 🖩 Python Tkinter Division App

A simple GUI calculator built with **Python** and **Tkinter** that divides two numbers and shows the result in a popup window.

This project was created as a beginner-friendly exercise to practice:
- GUI development with Tkinter
- Layout management with `grid`
- Input validation and error handling
- Using `messagebox` for user interaction
- Good practices in code organization

---

## Features
- **Two input fields**: Dividend and Divisor
- **Validation**:
  - Warns if fields are empty
  - Handles non-numeric input (`ValueError`)
  - Handles division by zero (`ZeroDivisionError`)
- **Buttons**:
  - **Divide** → performs the division and shows the result
  - **Clear** → clears the fields and resets focus to Dividend
- **User Experience**:
  - Fixed window height (cannot be resized vertically)
  - Entry fields stretch to fit the window width
  - Focus starts in the Dividend field

---

## GUI Layout
- **Row 0**: Label "Dividend" + Entry field
- **Row 1**: Label "Divisor" + Entry field
- **Row 2**: Two buttons (Divide, Clear)

---

## Project Structure
```
python-tkinter-division-app/
│── calculator.py   # Main Python script
│── README.md       # Project documentation
```

---

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/python-tkinter-division-app.git
   ```
2. Navigate to the folder:
   ```bash
   cd python-tkinter-division-app
   ```
3. Run the app:
   ```bash
   python calculator.py
   ```

---
