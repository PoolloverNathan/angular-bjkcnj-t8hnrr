import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core"
import { makeBanana } from "../banana"

@Component({
  selector: "app-toggle-icon",
  templateUrl: "./toggle-icon.component.html",
  styleUrls: ["./toggle-icon.component.css"],
})
export class ToggleIconComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  active = false
  @Output()
  activeChange: EventEmitter<boolean> = makeBanana(this, "active")
}
