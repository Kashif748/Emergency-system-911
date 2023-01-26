import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
  keyframes,
  sequence,
  stagger,
  state,
} from "@angular/animations";

export const animations = [
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger("animateStagger", [
    state("50", style("*")),
    state("100", style("*")),
    state("200", style("*")),

    transition(
      "void => 50",
      query("@*", [stagger("50ms", [animateChild()])], { optional: true })
    ),
    transition(
      "void => 100",
      query("@*", [stagger("100ms", [animateChild()])], { optional: true })
    ),
    transition(
      "void => 200",
      query("@*", [stagger("200ms", [animateChild()])], { optional: true })
    ),
  ]),

  trigger("slideInOut", [
    state(
      "0",
      style({
        height: "0px",
      })
    ),
    state(
      "1",
      style({
        height: "*",
      })
    ),
    transition("1 => 0", animate("300ms ease-out")),
    transition("0 => 1", animate("300ms ease-in")),
  ]),
  trigger("fadeInAnimation", [
    // route 'enter' transition
    transition(":enter", [
      // css styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate(".3s", style({ opacity: 1 })),
    ]),
  ]),

  trigger("fader", [
    transition("* <=> *", [
      // Set a default  style for enter and leave
      query(
        ":enter, :leave",
        [
          style({
            position: "absolute",
            left: 0,
            width: "100%",
            opacity: 0,
            transform: "  translateY(100%)",
          }),
        ],
        { optional: true }
      ),
      // Animate the new page in
      query(
        ":enter",
        [
          animate(
            "600ms ease-in-out",
            style({ opacity: 1, transform: "  translateY(0)" })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),

  trigger("fadeSlideInOut", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateY(10px)" }),
      animate("500ms", style({ opacity: 1, transform: "translateY(0)" })),
    ]),
    transition(":leave", [
      animate("500ms", style({ opacity: 0, transform: "translateY(10px)" })),
    ]),
  ]),
  trigger("fadeInGrow", [
    transition(":enter", [
      query(":enter", [
        style({ opacity: 0 }),
        stagger("50ms", [animate("500ms", style({ opacity: 1 }))]),
      ]),
    ]),
  ]),

  trigger("expandCollapse", [
    state(
      "void",
      style({
        height: "0px",
      })
    ),
    state(
      "*",
      style({
        height: "*",
      })
    ),
    transition("void => *", animate("300ms ease-out")),
    transition("* => void", animate("300ms ease-in")),
  ]),
];
