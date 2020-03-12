window.onload = function() {
    var storyUgcsContainer = document.querySelector(".story-list");
    var storyUgcs = document.querySelectorAll(".story-list__item");
    var storyModalWrapper = document.querySelector(".story-modal__wrapper");
    var storyModalClose = document.querySelector(".story-modal-close");
    var storyModalImgs = document.querySelectorAll(".story-modal-img");
    var storyModalList = document.querySelector(".story-modal-list");
    var storyProgressThumb = document.querySelector(
      ".story-modal-progressbar__item"
    );
    var storyModalPurchaseButtons = document.querySelectorAll(
      ".story-modal-purchase"
    );
    var storyModalProductsWrappers = document.querySelectorAll(
      ".story-modal-products__wrapper"
    );
    var autoplayDuration = 4000;
    var storyAutoplayInterval = null;
    var storyModalItemsLength = storyModalImgs.length;
    var storyCurrentSlide = 0;
    var storyLastTouchDownX = 0;
    var storyLastTouchDownY = 0;
    var storySlideIsDown = false;
    var storyUgcsMoved = false;
    var storyUgcsIsDown = false;
    var storySwipeMin = 40;
    var storyUgcsStartX;
    var storyUgcsScrollLeft;
    storyModalList.style.transform = "translateX(0px)";
    storyUgcs.forEach(function(item, i) {
      item.addEventListener("click", function() {
        if (storyUgcsMoved) {
          storyUgcsMoved = false;
          return;
        }
  
        storySlideSwitch(i);
        storyModalWrapper.classList.add("story-modal__wrapper_active");
        storyLaunchAutoplay(autoplayDuration);
      });
    });
    storyModalImgs.forEach(function(item) {
      item
        .querySelector(".story-modal-img__item")
        .setAttribute("draggable", false);
      item.addEventListener("mousedown", touchDown);
      item.addEventListener("touchstart", touchDown);
      item.addEventListener("mouseup", touchUp);
      item.addEventListener("touchend", touchUp);
      item.addEventListener("mouseleave", function() {
        storySlideIsDown = false;
      });
    });
    storyModalPurchaseButtons.forEach(function(item) {
      item.addEventListener("click", function() {
        storyStopAutoplay();
        showProducts(item.nextSibling.nextSibling);
      });
    });
    storyModalProductsWrappers.forEach(function(item) {
      item.addEventListener("click", function(e) {
        if (e.target.classList.contains("story-modal-products__wrapper")) {
          e.stopImmediatePropagation();
          hideProducts(e.target);
        }
      });
    });
    storyModalClose.addEventListener("click", function() {
      storyCloseModal();
    });
  
    function touchDown(e) {
      storyLastTouchDownX = getTouchX(e);
      storyLastTouchDownY = getTouchY(e);
      storySlideIsDown = true;
      storyStopAutoplay();
    }
  
    function touchUp(e) {
      e.preventDefault();
  
      if (
        e.target.classList.contains("story-modal-img__item") &&
        storySlideIsDown
      ) {
        var slideDir;
  
        if (
          storyLastTouchDownX == getTouchX(e) &&
          storyLastTouchDownY == getTouchY(e)
        ) {
          slideDir = "next";
        } else {
          if (Math.abs(storyLastTouchDownX - getTouchX(e)) < storySwipeMin) {
            return;
          }
  
          slideDir = storyLastTouchDownX < getTouchX(e) ? "prev" : "next";
        }
  
        storySlideSwitch(slideDir);
        storyLaunchAutoplay(autoplayDuration);
      }
  
      storySlideIsDown = false;
    }
  
    function getTouchX(e) {
      return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    }
  
    function getTouchY(e) {
      return e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    }
  
    function storySlideSwitch(type) {
      var modalListWidth = storyModalList.clientWidth;
  
      if (type === "next") {
        if (storyCurrentSlide < storyModalItemsLength - 1) {
          storyCurrentSlide++;
        } else {
          storyCurrentSlide = 0;
        }
  
        storyModalList.style.transform = "translateX(-".concat(
          storyCurrentSlide * modalListWidth,
          "px)"
        );
        storyInitProgressbar();
      } else if (type === "prev") {
        if (storyCurrentSlide > 0) {
          storyCurrentSlide--;
        } else {
          storyCurrentSlide = storyModalItemsLength - 1;
        }
  
        storyModalList.style.transform = "translateX(-".concat(
          storyCurrentSlide * modalListWidth,
          "px)"
        );
        storyInitProgressbar();
      } else if (typeof type === "number") {
        if (
          storyCurrentSlide < storyModalItemsLength - 1 ||
          storyCurrentSlide >= 0
        ) {
          storyCurrentSlide = type;
          storyModalList.style.transform = "translateX(-".concat(
            storyCurrentSlide * modalListWidth,
            "px)"
          );
          storyInitProgressbar();
        }
      }
    }
  
    function storyLaunchAutoplay(duration) {
      clearInterval(storyAutoplayInterval);
      storyAutoplayInterval = setInterval(function() {
        storySlideSwitch("next");
      }, duration);
    }
  
    function storyStopAutoplay() {
      clearInterval(storyAutoplayInterval);
    }
  
    function storyInitProgressbar() {
      storyProgressThumb.setAttribute("style", "");
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          storyProgressThumb.setAttribute(
            "style",
            "transition-duration: ".concat(autoplayDuration, "ms")
          );
          storyProgressThumb.style.transform = "scaleX(1)";
        });
      });
    }
  
    function storyCloseModal() {
      storyModalWrapper.classList.remove("story-modal__wrapper_active");
      clearInterval(storyAutoplayInterval);
      hideProducts(null, true);
    }
  
    function hideProducts(wrapper, all) {
      if (!all) {
        wrapper.style.display = "";
      } else {
        storyModalProductsWrappers.forEach(function(item) {
          return (item.style.display = "");
        });
      }
    }
  
    function showProducts(wrapper) {
      wrapper.style.display = "flex";
    }
  
    storyUgcsContainer.addEventListener("mousedown", storyUgcsTouchDown);
    storyUgcsContainer.addEventListener("touchstart", storyUgcsTouchDown);
    storyUgcsContainer.addEventListener("mouseleave", storyUgcsTouchUp);
    storyUgcsContainer.addEventListener("mouseup", storyUgcsTouchUp);
    storyUgcsContainer.addEventListener("touchend", storyUgcsTouchUp);
    storyUgcsContainer.addEventListener("mousemove", storyUgcsTouchMove);
    storyUgcsContainer.addEventListener("touchmove", storyUgcsTouchMove);
  
    function storyUgcsTouchUp() {
      storyUgcsIsDown = false;
      storyUgcsContainer.classList.remove("active");
    }
  
    function storyUgcsTouchDown(e) {
      var pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
      storyUgcsIsDown = true;
      storyUgcsMoved = false;
      storyUgcsContainer.classList.add("active");
      storyUgcsStartX = pageX - storyUgcsContainer.offsetLeft;
      storyUgcsScrollLeft = storyUgcsContainer.scrollLeft;
    }
  
    function storyUgcsTouchMove(e) {
      if (!storyUgcsIsDown) return;
      storyUgcsMoved = true;
      e.preventDefault();
      var pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
      var x = pageX - storyUgcsContainer.offsetLeft;
      var walk = (x - storyUgcsStartX) * 2;
      storyUgcsContainer.scrollLeft = storyUgcsScrollLeft - walk;
    }
  };
