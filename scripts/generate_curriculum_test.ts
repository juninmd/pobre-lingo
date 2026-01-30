
import * as fs from 'fs';
import * as path from 'path';
import { curriculumData } from '../src/lib/curriculumData';

const testFilePath = path.join(__dirname, '../tests/e2e/test_comprehensive_curriculum.py');

function generateTest() {
  let testContent = `
from playwright.sync_api import Page, expect
import pytest

# Comprehensive Curriculum Walkthrough

@pytest.fixture(autouse=True)
def setup(page: Page):
    page.goto("http://localhost:5173/")

`;

  curriculumData.modules.forEach(module => {
    module.lessons.forEach(lesson => {
       // Python function names must be clean
       const safeId = lesson.id.replace(/-/g, '_');
       const safeModId = module.id.replace(/-/g, '_');
       const testName = `test_load_lesson_${safeId}_in_${safeModId}`;

       let url = '';
       const mid = module.id;
       const lid = lesson.id;

       if (lesson.gameType) {
          url = `/games/${lesson.gameType}?module=${mid}&lesson=${lid}`;
       } else if (lesson.exerciseType) {
          url = `/exercises/${lesson.exerciseType}?module=${mid}&lesson=${lid}`;
       } else if (lesson.type === 'vocabulary' || lesson.type === 'speaking') {
          url = `/vocabulary/${mid}/${lid}`;
       } else if (lesson.type === 'quiz') {
          url = `/quiz/${mid}/${lid}`;
       } else if (lesson.type === 'grammar') {
          url = `/rules?module=${mid}&lesson=${lid}`;
       } else {
          url = `/exercises/news-comprehension?module=${mid}&lesson=${lid}`;
       }

       testContent += `
def ${testName}(page: Page):
    # Navigate to curriculum page
    page.goto("http://localhost:5173/curriculum")

    # Direct navigation to verify route
    target_url = "http://localhost:5173${url}"
    print(f"Testing URL: {target_url}")
    page.goto(target_url)

    # Verify not 404
    # We check if the body contains "404" or "Page Not Found" text,
    # but more robustly we check if a key element exists.
    # For now, text content check is a good generic catch-all.
    content = page.content()
    assert "404" not in content
    assert "Page Not Found" not in content

    # Optional: Check for key elements based on type
    # page.wait_for_selector("button", timeout=5000)
`;
    });
  });

  fs.writeFileSync(testFilePath, testContent);
  console.log(`Generated ${testFilePath}`);
}

generateTest();
