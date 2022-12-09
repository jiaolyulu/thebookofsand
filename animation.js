
// don't forget to register plugins
var tl = gsap.timeline({smoothChildTiming:true, repeat:0});
tl.to(".textfloat", {
    duration: 1,
    scale: 0.8,
    ease: "power1.inOut",
    stagger: {
      grid: [7,15],
      from: "left",
      amount: 1.5
    }
  });
  tl.to(".textfloat", {
    duration: 1,
    scale: 1,
    ease: "power1.inOut",
    stagger: {
      grid: [7,15],
      from: "left",
      amount: 1.5
    }
  });