import re

import sys
import os

# Mock logic to simulate curriculum data structure for verification
# In a real scenario we might use a JS runner, but python is robust enough for parsing and checking structure logic gaps

def main():
    print("Starting static verification of curriculum content linkage...")

    # We will read the file content of curriculumData.ts to find all lessons
    try:
        with open('src/lib/curriculumData.ts', 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print("Error: src/lib/curriculumData.ts not found.")
        sys.exit(1)

    # Extract lessons using a simple regex pattern to find object definitions
    # This is a heuristic.
    # We look for "id: '...'," and then check subsequent lines for "type: '...'" and "exerciseType: '...'"

    # Better approach: check what types are handled in src/pages/vocabulary/[moduleId]/[lessonId]/page.tsx
    # We know from reading the file that it ONLY handles 'vocabulary' and 'speaking' explicitly.
    # It does NOT import or render generic exercise components based on 'exerciseType'.

    print("ANALYSIS: src/pages/vocabulary/[moduleId]/[lessonId]/page.tsx only handles 'vocabulary' and 'speaking'.")
    print("Checking for lessons that will fail to render...")

    # Parse curriculum data to find non-vocabulary/non-speaking lessons
    # We'll split by "id:" to find lesson blocks roughly

    lines = content.split('\n')
    current_lesson_id = None
    current_lesson_type = None
    current_exercise_type = None

    failed_lessons = []

    for line in lines:
        line = line.strip()
        if "id: '" in line:
            # New ID found, reset current
            match = re.search(r"id: '([^']+)'", line)
            if match:
                current_lesson_id = match.group(1)
                current_lesson_type = None
                current_exercise_type = None

        if "type: '" in line:
            match = re.search(r"type: '([^']+)'", line)
            if match:
                current_lesson_type = match.group(1)

        if "exerciseType: '" in line:
            match = re.search(r"exerciseType: '([^']+)'", line)
            if match:
                current_exercise_type = match.group(1)

        # End of object block (rough heuristic)
        if "}," in line and current_lesson_id:
            # Evaluate the lesson
            # If type is NOT vocabulary AND NOT speaking, it is potentially broken
            # UNLESS it is handled by specific logic we haven't added yet.

            if current_lesson_type and current_lesson_type not in ['vocabulary', 'speaking']:
                 failed_lessons.append({
                     'id': current_lesson_id,
                     'type': current_lesson_type,
                     'exerciseType': current_exercise_type
                 })

            # Reset for next
            # current_lesson_id = None # Don't reset immediately as multiple properties span lines, but usually ID is first.
            # actually this loop logic is flawed because ID might not be first.
            pass

    # Let's use a simpler grep check for now to confirm magnitude
    # count lessons with type: 'grammar'
    # count lessons with type: 'exercise'
    # count lessons with type: 'reading'
    # count lessons with type: 'quiz'

    print("\n--- Manual Inspection Required for these types ---")
    print("Reference: VocabularyLessonPage only handles 'vocabulary' and 'speaking'.")



    types_found = set()
    matches = re.findall(r"type: '([^']+)'", content)
    for m in matches:
        types_found.add(m)

    print(f"Types found in curriculum: {types_found}")

    missing_handlers = [t for t in types_found if t not in ['vocabulary', 'speaking']]

    if missing_handlers:
        print(f"\nCRITICAL: The following lesson types have NO rendering logic in the lesson page: {missing_handlers}")
        print("This confirms the user's PR comment is correct.")
        print("We need to implement handlers for:", missing_handlers)
    else:
        print("All types seem to be covered (Unlikely based on manual review).")

if __name__ == "__main__":
    main()
