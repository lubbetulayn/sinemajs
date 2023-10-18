/**istenen işlev-1 için aşamalrı*/
//!çağırmalar
//tıklanılan koltuğa ulaşmak için container div'ini çek
const container = document.querySelector(".container");
const infoText = document.querySelector('.infoText');
const totalSeatCount = document.getElementById('count');
const totalPrice = document.getElementById('amount');
const movieSelect = document.getElementById('movie');
//tüm koltukları çağır
const allSeats = document.querySelectorAll('.seat:not(.reserve)');

const saveToDatabase = (willSaveIndex) => {
  // console.log(willSaveIndex)
  //Veriyi JSON formatına çevirme
  const jsonIndex = JSON.stringify(willSaveIndex);
  //Veri Tabanına koldutkarı kayıt etme
  localStorage.setItem("seatIndex", jsonIndex);
  localStorage.setItem('movieIndex', JSON.stringify(movieSelect.selectedIndex))

};

//kullanıcıların önceki ziyaretlerinde seçtikleri koltukları hatırlayarak, 
//bu koltukları sayfada otomatik olarak işaretler.
const getFromDataBase = () => {
  const dbSelectedIndex = JSON.parse(localStorage.getItem("seatIndex"));

  if (dbSelectedIndex !== null) {
    allSeats.forEach((seat, index) => {
      if (dbSelectedIndex.includes(index)) {
        seat.classList.add("selected");
      }
    })
  }
  const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'))
  movieSelect.selectedIndex = dbSelectedMovie;
  };

getFromDataBase();


//!notelisti array'e çevir
const createIndex=()=>{
  //notelist'i array'e çevir
const allSeatsArray=[];

//notlisti dönmek için: her koltuğun no'sunu diziye koyma komutu ver
allSeats.forEach((seat) => {
//seçilen koltuğu diziye gönder
allSeatsArray.push(seat);
})
//!hangi koltuğu seçtin
//dizi oluştur
const allSelectedSeatsArray=[];
//seçilmesini istediklerinin hepsini seç
const selectedSeats=container.querySelectorAll('.seat.selected');
//selectedSeats dizisindeki seçilen koltukları allSelectedSeatsArray dizisine ekler
selectedSeats.forEach((selectedSeat)=> {
  allSelectedSeatsArray.push(selectedSeat);
});
//seçtiğin tüm koltukları dön
const selectedIndex = allSelectedSeatsArray.map((selectedSeat) => {
  //seçilenin hangi indexe karşılık geldiğini sorgula
  return allSeatsArray.indexOf(selectedSeat);
})

saveToDatabase(selectedIndex);
};


//toplam fiyat hesaplama function
function calculateTotal(){
  createIndex();
  //seçili koltuk var mı?
    const selectedSeatCounts = 
    container.querySelectorAll('.seat.selected').length;
    // değişkeninin (seçilen koltuk sayısı) değerini günceller
   totalSeatCount.innerText=selectedSeatCounts;
   // değişkeninin ( seçilen film seçeneği) değerini günceller
   let selectedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value
   // ücretin güncellenmesi
   totalPrice.innerText=selectedSeatCounts*selectedMoviePrice
    if(selectedSeatCounts >0){
      //koltuk varsa bunu görünür kıldı
      infoText.classList.add('open');
    } else {
      //seçimi iptal ettiğinde 
      infoText.classList.remove('open');
    }
}
calculateTotal()

//container'a bir olay dinleyicisi ekle (addEventListener)
//!pointerEvent:'e' dediğimiz
container.addEventListener("click", (pointerEvent) => {
  
// console.log('container tıklandı')

//tıklanılan koltuk
  //! offseatParent:bir elementin pozisyonunu belirleme ve işlem yapma
  const clickedSeat = pointerEvent.target.offsetParent;
  console.log(pointerEvent.target.offsetParent);

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserve")
  ) {
    clickedSeat.classList.toggle("selected");
  }

  //yukarıda çağırdık ama tıklama sonra gerçekleştiği 
  //için tekrar bu fonk. tekrar çağırmak gerekir.
  calculateTotal();
});

//film türünü değiştirince fiyat otamatik güncellensin(algoritma) 
movieSelect.addEventListener('change', () => {
  calculateTotal();
})