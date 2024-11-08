﻿# uselectiondashboard2024
This is an election dashboard. 

Here are the specs
# Election Results Tracker Requirements Specification

## 1. Data Model

### 1.1 State Information
- Complete list of 50 US states
- Electoral vote count for each state
- State name as display label
- States must be maintained in alphabetical order

### 1.2 Vote Data Per State
- Popular vote count for Harris
- Popular vote count for Trump
- Percentage of total votes counted (0-100)
- Called status for Harris (boolean)
- Called status for Trump (boolean)

## 2. User Interface

### 2.1 Summary Display
- Split into two distinct sections:
  #### 2.1.1 Electoral College Section
  - Total electoral votes for Harris from called states
  - Total electoral votes for Trump from called states
  - Number of states called for each candidate
  - Clear indication of 270 votes needed to win
  
  #### 2.1.2 Popular Vote Section
  - Running total of votes for Harris across all states
  - Running total of votes for Trump across all states
  - Number of states reporting any votes
  - Vote counts formatted with thousands separators

### 2.2 State-by-State Display
- Alphabetical list of all states
- State name with electoral vote count
- Input field for Harris votes
- Input field for Trump votes
- Input field for percentage reporting
- Call state checkboxes for each candidate
- Visual indicator of percentage counted
- Color coding to indicate:
  - Called state (dark blue/red)
  - Current vote leader (light blue/red)
  - Uncalled/no votes (gray)

## 3. Functionality

### 3.1 Vote Input
- Accept numerical inputs only
- No negative numbers allowed
- Automatically update totals on input
- Allow clearing/resetting of values
- Percentage reporting must be 0-100

### 3.2 State Calling
- Toggle call status via checkbox
- Only one candidate can have a state called at a time
- Uncalling a state removes electoral votes from total
- Calling for one candidate automatically uncalls for other

### 3.3 Calculations
#### 3.3.1 Popular Vote
- Sum all entered votes for each candidate
- Update in real-time as votes are entered
- Track number of states with any votes entered

#### 3.3.2 Electoral Vote
- Only count electoral votes from called states
- Update immediately when states are called/uncalled
- Track number of states called for each candidate

## 4. Validation Rules

### 4.1 Input Validation
- Vote counts must be non-negative integers
- Percentage reported must be between 0 and 100
- Empty inputs treated as zero

### 4.2 State Calling Validation
- Prevent simultaneous calls for both candidates
- Allow uncalling at any time
- Allow calling regardless of vote counts or reporting percentage

## 5. Visual Design

### 5.1 Color Scheme
- Harris: Blue (#2563EB for called, lighter for leading)
- Trump: Red (#DC2626 for called, lighter for leading)
- Gray (#666666) for uncalled states
- Light gray (#F9FAFB) for summary background

### 5.2 Layout
- Summary cards at top
- Scrollable state list below
- Consistent spacing between elements
- Clear visual hierarchy
- Mobile-responsive design

## 6. Performance Requirements

### 6.1 Real-time Updates
- Immediate recalculation of totals on any change
- No noticeable delay in UI updates
- Smooth scrolling through state list

### 6.2 Data Handling
- Handle large vote numbers (millions)
- Proper number formatting
- Efficient state management

## 7. State Management

### 7.1 Local Storage
- Maintain vote counts during session
- Maintain called status during session
- Clear data on page refresh

### 7.2 Data Updates
- Atomic updates to vote counts
- Immediate reflection of changes in UI
- Maintain consistency between popular and electoral counts

## 8. Accessibility

### 8.1 Input Accessibility
- Clear input labels
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels

### 8.2 Visual Accessibility
- Sufficient color contrast
- Clear visual indicators
- Non-color dependent status indicators

## 9. Future Enhancements (Not Implemented)

### 9.1 Data Persistence
- Save/load functionality
- Export results
- Historical tracking

### 9.2 Additional Features
- Sort states by various criteria
- Filter states by status
- Detailed state statistics
- Victory detection
- Timeline tracking
