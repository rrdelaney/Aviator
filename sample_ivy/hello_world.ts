import {
  Component,
  ɵrenderComponent as renderComponent,
  ViewContainerRef,
  ɵdefineDirective as defineDirective,
  ɵdirectiveInject as directiveInject,
  TemplateRef
} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'hello-world',
  template: `
    <display-name [name]="name"> <span>Ryan</span> </display-name>
  `
})
export class HelloWorld {
  name = 'Ryan';

  constructor(vcr: ViewContainerRef) {}
}

function installNgIfCompat() {
  (NgIf as any).ngDirectiveDef = defineDirective({
    type: NgIf,
    selectors: [['ngIf']],
    factory: () =>
      new NgIf(
        directiveInject(ViewContainerRef as any),
        directiveInject(TemplateRef as any)
      ),
    inputs: {ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse'}
  });
}

let didInstall = false;
export function installCompat() {
  if (didInstall) return;
  installNgIfCompat();
  didInstall = true;
}

let root = document.createElement('hello-world');
document.body.appendChild(root);
renderComponent(HelloWorld);
