import { Directive,ElementRef, HostListener ,asNativeElements,Input } from '@angular/core';

@Directive({
  selector: '[appColorVehiculo]'
})
export class ColorVehiculoDirective {

  @Input('appColorVehiculo') highlightColor: string;
  constructor(public el: ElementRef) { }
  private highlight(color) {
    switch(color)
    {
      case "1":
        this.el.nativeElement.style.backgroundColor = "greenyellow";
        break;
      case "2":
        this.el.nativeElement.style.backgroundColor = "orangered";
        break;
    }
    //this.el.nativeElement.style.backgroundColor = color;
  }
  
  /*@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }*/
  ngOnInit() {
    this.highlight(this.highlightColor);
  }

}
