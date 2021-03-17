<template>
<div class="ebook-reader">
<div id="read"> </div>
</div>
</template>
<script>

  import { ebookMixin } from '../../utils/mixin'
  import Epub from 'epubjs'
  global.ePub=Epub
  export default {
    mixins: [ebookMixin],
    methods: {
        prevPage () {
          if (this.rendition) {
            this.rendition.prev()
           //this.hideTitleAndMenu()
          }
        },
        nextPage() {
          if (this.rendition) {
            this.rendition.next()
           // this.hideTitleAndMenu()
          }
        },
        toggleTitleAndMenu() {
          //this.$store.dispatch('setMenuVisible', !this.menuVisible)
          this.setMenuVisible(!this.menuVisible)
        },
      // hideTitleAndMenu() {this.$store.dispatch('setMenuVisible', false)},
        initEpub () {
          const url='http://192.168.1.7:99/epub/' + this.fileName + '.epub'
          this.book = new Epub(url)
          this.setCurrentBook(this.book)
          this.rendition=this.book.renderTo('read',{
            width: innerWidth,
            height: innerHeight,
            method: 'default',
          })
          this.rendition.display()
          this.rendition.on('touchstart', event => {
            this.touchStartX = event.changedTouches[0].clientX
            this.touchStartTime = event.timeStamp
          })//将事件绑定在iframe里边
          this.rendition.on('touchend', event => {
            const offsetX = event.changedTouches[0].clientX - this.touchStartX
            const time = event.timeStamp - this.touchStartTime
            if (time <500 && offsetX >40){
              this.prevPage()
            } else if (time <500 && offsetX <-40 ){
              this.nextPage()
            } else {
              this.toggleTitleAndMenu()
            }
            event.preventDefault()
            event.stopPropagation()
          })//将事件绑定在iframe里边
        }
      },
      mounted () {
       this.setFileName(this.$route.params.fileName.split('|').join('/'))
         .then(() => { this.initEpub()
       })
      },
      name: "ebook-reader"
    }
</script>

<style scoped>

</style>
