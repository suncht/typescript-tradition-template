class LoadIndex {
  private element: HTMLElement
  constructor(element: HTMLElement) {
    this.element = element
  }

  render () {
    this.element.innerHTML = "測試"
  }
}

const indexLoader = new LoadIndex(window.document.getElementById("app"))
indexLoader.render()
