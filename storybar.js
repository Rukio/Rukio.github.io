window.onload = () => {
    const storyUgcsContainer = document.querySelector('.story-list')
    const storyUgcs = document.querySelectorAll('.story-list__item')
    const storyModalWrapper = document.querySelector('.story-modal__wrapper')
    const storyModalClose = document.querySelector('.story-modal-close')
    const storyModalImgs = document.querySelectorAll('.story-modal-img')
    const storyModalList = document.querySelector('.story-modal-list')
    const storyProgressThumb = document.querySelector('.story-modal-progressbar__item')
    const storyModalPurchaseButtons = document.querySelectorAll('.story-modal-purchase')
    const storyModalProductsWrappers = document.querySelectorAll('.story-modal-products__wrapper')
    const autoplayDuration = 4000
    let storyAutoplayInterval = null
    let storyModalItemsLength = storyModalImgs.length
    let storyCurrentSlide = 0
    let storyLastTouchDownX = 0
    let storyLastTouchDownY = 0
    let storySlideIsDown = false
    let storyUgcsMoved = false
    let storyUgcsIsDown = false
    let storySwipeMin = 40
    let storyUgcsStartX
    let storyUgcsScrollLeft

    storyModalList.style.transform = 'translateX(0px)'

    storyUgcs.forEach((item, i) => {
        item.addEventListener('click', () => {
            if (storyUgcsMoved) {
                storyUgcsMoved = false
                return
            }
            storySlideSwitch(i)
            storyModalWrapper.classList.add('story-modal__wrapper_active')
            storyLaunchAutoplay(autoplayDuration)
        })
    })

    storyModalImgs.forEach(item => {
        item.querySelector('.story-modal-img__item').setAttribute('draggable', false)
        item.addEventListener('mousedown', touchDown)
        item.addEventListener('touchstart', touchDown)
        item.addEventListener('mouseup', touchUp)
        item.addEventListener('touchend', touchUp)
        item.addEventListener('mouseleave', () => {
            storySlideIsDown = false
        })
    })

    storyModalPurchaseButtons.forEach(item => {
        item.addEventListener('click', () => {
            storyStopAutoplay()
            showProducts(item.nextSibling.nextSibling)
        })
    })

    storyModalProductsWrappers.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('story-modal-products__wrapper')) {
                e.stopImmediatePropagation()
                hideProducts(e.target)
            }
        })
    })

    storyModalClose.addEventListener('click', () => {
        storyCloseModal()
    })

    function touchDown(e) {
        storyLastTouchDownX = getTouchX(e)
        storyLastTouchDownY = getTouchY(e)
        storySlideIsDown = true
        storyStopAutoplay()
    }

    function touchUp(e) {
        if (e.target.classList.contains('story-modal-img__item') && storySlideIsDown) {
            let slideDir
            if (storyLastTouchDownX == getTouchX(e) && storyLastTouchDownY == getTouchY(e)) {
                slideDir = 'next'
            } else {
                if (Math.abs(storyLastTouchDownX - getTouchX(e)) < storySwipeMin) {
                    return
                }
                slideDir = storyLastTouchDownX < getTouchX(e) ? 'prev' : 'next'
            }
            storySlideSwitch(slideDir)
            storyLaunchAutoplay(autoplayDuration)
        }
        storySlideIsDown = false
    }

    function getTouchX(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    }

    function getTouchY(e) {
        return e.changedTouches ? e.changedTouches[0].clientY : e.clientY
    }

    function storySlideSwitch(type) {
        const modalListWidth = storyModalList.clientWidth

        if (type === 'next') {
            if (storyCurrentSlide < storyModalItemsLength - 1) {
                storyCurrentSlide++
            } else { storyCurrentSlide = 0 }
            storyModalList.style.transform = `translateX(-${storyCurrentSlide * modalListWidth}px)`
            storyInitProgressbar()
        } else if (type === 'prev') {
            if (storyCurrentSlide > 0) {
                storyCurrentSlide--
            } else { storyCurrentSlide = storyModalItemsLength - 1 }
            storyModalList.style.transform = `translateX(-${storyCurrentSlide * modalListWidth}px)`
            storyInitProgressbar()
        } else if (typeof type === 'number') {
            if (storyCurrentSlide < storyModalItemsLength - 1 || storyCurrentSlide >= 0) {
                storyCurrentSlide = type
                storyModalList.style.transform = `translateX(-${storyCurrentSlide * modalListWidth}px)`
                storyInitProgressbar()
            }
        }
    }

    function storyLaunchAutoplay(duration) {
        clearInterval(storyAutoplayInterval)
        storyAutoplayInterval = setInterval(() => {
            storySlideSwitch('next')
        }, duration)
    }

    function storyStopAutoplay() {
        clearInterval(storyAutoplayInterval)
    }

    function storyInitProgressbar() {
        storyProgressThumb.setAttribute('style', '');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                storyProgressThumb.setAttribute('style', `transition-duration: ${autoplayDuration}ms`);
                storyProgressThumb.style.transform = `scaleX(1)`
            })
        })
    }

    function storyCloseModal() {
        storyModalWrapper.classList.remove('story-modal__wrapper_active')
        clearInterval(storyAutoplayInterval)
        hideProducts(null, true)
    }

    function hideProducts(wrapper, all) {
        if (!all) {
            wrapper.style.display = ''
        } else {
            storyModalProductsWrappers.forEach(item => item.style.display = '')
        }
    }

    function showProducts(wrapper) {
        wrapper.style.display = 'flex'
    }

    storyUgcsContainer.addEventListener('mousedown', storyUgcsTouchDown)
    storyUgcsContainer.addEventListener('touchstart', storyUgcsTouchDown)
    storyUgcsContainer.addEventListener('mouseleave', storyUgcsTouchUp)
    storyUgcsContainer.addEventListener('mouseup', storyUgcsTouchUp)
    storyUgcsContainer.addEventListener('touchend', storyUgcsTouchUp)
    storyUgcsContainer.addEventListener('mousemove', storyUgcsTouchMove)
    storyUgcsContainer.addEventListener('touchmove', storyUgcsTouchMove)

    function storyUgcsTouchUp() {
        storyUgcsIsDown = false
        storyUgcsContainer.classList.remove('active')
    }

    function storyUgcsTouchDown(e) {
        const pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
        storyUgcsIsDown = true
        storyUgcsMoved = false
        storyUgcsContainer.classList.add('active')
        storyUgcsStartX = pageX - storyUgcsContainer.offsetLeft
        storyUgcsScrollLeft = storyUgcsContainer.scrollLeft
    }

    function storyUgcsTouchMove(e) {
        if(!storyUgcsIsDown) return
        storyUgcsMoved = true
        e.preventDefault()
        const pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
        const x = pageX - storyUgcsContainer.offsetLeft
        const walk = (x - storyUgcsStartX) * 2
        storyUgcsContainer.scrollLeft = storyUgcsScrollLeft - walk
    }
}
