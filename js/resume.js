const form = document.getElementById("resumeForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // 실제 제출 막기
  let valid = true;

  const checkField = (id, errorId, pattern = null, patternMsg = "") => {
    const field = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!field.value.trim()) {
      error.textContent = "입력하세요";
      error.classList.remove("hidden");
      valid = false;
    } else if (pattern && !pattern.test(field.value)) {
      error.textContent = patternMsg;
      error.classList.remove("hidden");
      valid = false;
    } else {
      error.classList.add("hidden");
    }
  }

  // 개인정보
  checkField("name", "nameError");
  checkField("birth", "birthError");
  checkField("phone", "phoneError", /^\d{2,3}-\d{3,4}-\d{4}$/, "형식이 잘못되었습니다. 예: 010-1234-5678");
  checkField("email", "emailError", /\S+@\S+\.\S+/, "형식이 잘못되었습니다. 다시 입력해주세요");

  // 학력
  const schoolFilled = document.getElementById("school").value.trim() &&
                       document.getElementById("major").value.trim() &&
                       document.getElementById("gradYear").value.trim();
  document.getElementById("schoolError").classList.toggle("hidden", !!schoolFilled);
  if (!schoolFilled) valid = false;

  // 경력
  const careerFilled = document.getElementById("company").value.trim() &&
                       document.getElementById("position").value.trim() &&
                       document.getElementById("period").value.trim();
  document.getElementById("careerError").classList.toggle("hidden", !!careerFilled);
  if (!careerFilled) valid = false;

  // 기술 스택
  checkField("skills", "skillsError");

  // 자기소개
  checkField("intro", "introError");

  if (valid) {
    alert("제출 완료!");
    form.reset();
  }
});
