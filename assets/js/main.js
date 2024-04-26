const loadJsonFile = async (jsonFile) => (await fetch(jsonFile)).json()

const appendItem = (item) => {
    const timeframesContainer = document.querySelector('.timeframes-container')

    const sectionClassType = item.title.toLowerCase().replace(' ', '-')

    timeframesContainer.innerHTML += `
        <section class="timeframes-wrapper ${sectionClassType}">
            <div class="timeframes">
                <h2>
                    <span>${item.title}</span>
                    <img src="assets/images/icon-ellipsis.svg" alt="ellipsis image" width="21" height="5">
                </h2>

                <div id="daily-${sectionClassType}" class="timeframe hidden">
                    <span class="current"><span>${item.timeframes.daily.current}</span>hrs</span>
                    <span class="previous">Last Day - <span>${item.timeframes.daily.previous}</span>hrs</span>
                </div>

                <div id="weekly-${sectionClassType}" class="timeframe hidden">
                    <span class="current"><span>${item.timeframes.weekly.current}</span>hrs</span>
                    <span class="previous">Last Week - <span>${item.timeframes.weekly.previous}</span>hrs</span>
                </div>

                <div id="montly-${sectionClassType}" class="timeframe hidden">
                    <span class="current"><span>${item.timeframes.monthly.current}</span>hrs</span>
                    <span class="previous">Last Month - <span>${item.timeframes.monthly.previous}</span>hrs</span>
                </div>
            </div>
        </section>
    `
}

const toggleTimeframes = (buttonType) => {
    const timeframes = document.querySelectorAll('.timeframe')

    timeframes.forEach(timeframe => {
        if (!timeframe.id.includes(buttonType))
            timeframe.classList.add('hidden')
        else
            timeframe.classList.remove('hidden')
    })
}

const handleButtonClick = (event) => {
    const buttonType = event.currentTarget.id.slice(3).toLowerCase()

    buttons.forEach(button => {
        if (button !== event.currentTarget)
            button.dataset.active = false;
        else
            button.dataset.active = true;

        toggleTimeframes(buttonType)
    })
}

const data = await loadJsonFile('./data.json')
const buttons = document.querySelectorAll('button')

data.forEach(appendItem)
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick)

    if (button.dataset.active === 'true')
        button.click()
})
