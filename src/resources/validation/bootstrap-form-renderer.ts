export class BootstrapFormRenderer {
  render(instruction) {
    for (let {result, elements} of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let {result, elements} of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element, result) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (!formGroup.classList.contains('has-danger')) {
        formGroup.classList.add('has-success');
        element.classList.add('form-control-success');
      }
    } else {
      formGroup.classList.remove('has-success');
      element.classList.remove('form-control-success');
      formGroup.classList.add('has-danger');
      element.classList.add('form-control-danger');

      // add help-block
      const message = document.createElement('div');
      message.className = 'form-control-feedback';
      message.textContent = result.message;
      message.id = `validation-message-${result.id}`;
      formGroup.appendChild(message);
    }
  }

  remove(element, result) {
    const formGroup = element.closest('.form-group');
    if (!formGroup) {
      return;
    }

    if (result.valid) {
      if (formGroup.classList.contains('has-success')) {
        formGroup.classList.remove('has-success');
      }
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#validation-message-${result.id}`);
      if (message) {
        formGroup.removeChild(message);

        // remove the has-error class from the enclosing form-group div
        if (formGroup.querySelectorAll('.form-control-feedback.validation-message').length === 0) {
          formGroup.classList.remove('has-danger');
        }
      }
    }
  }
}
