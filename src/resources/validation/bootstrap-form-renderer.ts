import { RenderInstruction, ValidateResult, ValidationRenderer } from 'aurelia-validation';

export class BootstrapFormRenderer implements ValidationRenderer {
  render(instruction: RenderInstruction): void {
    for (const {result, elements} of instruction.unrender) {
      for (const element of elements) {
        this.remove(element, result);
      }
    }

    for (const {result, elements} of instruction.render) {
      for (const element of elements) {
        this.add(element, result);
      }
    }
  }

  remove(element: Element, result: ValidateResult): void {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (element.classList.contains('is-valid')) {
        element.classList.remove('is-valid');
      }
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);
        element.classList.remove('is-invalid');
      }
    }
  }

  add(element: Element, result: ValidateResult): void {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (!element.classList.contains('is-invalid')) {
        element.classList.add('is-valid');
      }
    } else {
      element.classList.remove('is-valid');
      element.classList.add('is-invalid');

      // add help-block
      const message = document.createElement('div');
      message.className = 'invalid-feedback';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  }
}
