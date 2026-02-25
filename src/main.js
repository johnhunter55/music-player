import "./style.css";

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.isPlaying = false;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  moveNext() {
    if (!this.current) return;
    if (this.current.next) {
      this.current = this.current.next;
    } else {
      this.current = this.head; // Wrap to head
    }
  }

  movePrev() {
    if (!this.current) return;
    if (this.current.prev) {
      this.current = this.current.prev;
    } else {
      this.current = this.tail; // Wrap to tail
    }
  }

  getCurrent() {
    return this.current ? this.current.value : null;
  }
}

const playlist = new DoublyLinkedList();

playlist.append({
  title: "I THINK - Tyler, The Creator",
  color: "pink",
  image:
    "https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg",
});
playlist.append({
  title: "STAY HERE 4 LIFE - A$AP Rocky",
  color: "blue",
  image:
    "https://media.pitchfork.com/photos/696a9716019618f4a187ec3d/1:1/w_450%2Cc_limit/ASAP%2520Rocky%2520-%2520Don't%2520Be%2520Dumb%2520cover%2520art.jpg",
});
playlist.append({
  title: "2000 EXCURSION - Travis Scott",
  color: "zinc",
  image: "https://i.scdn.co/image/ab67616d00001e0218325ce9b2c009de5dc8f9fd",
});
playlist.append({
  title: "PURPLE RAIN - Don Toliver",
  color: "indigo",
  image: "https://i1.sndcdn.com/artworks-0j5o24nKUp2Q-0-t500x500.jpg",
});
playlist.append({
  title: "Ladders - Mac Miller",
  color: "taupe",
  image:
    "https://images.genius.com/8bfb418599d42aa088e66b5437a87374.1000x1000x1.jpg",
});

const display = document.getElementById("current-song");
const albumArt = document.getElementById("album-art");
const playBtn = document.getElementById("btn-play");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const container = document.getElementById("container");

let currentColor = "emerald";

function updateDisplay() {
  const song = playlist.getCurrent();
  display.innerText = song.title;
  albumArt.src = song.image;
  playBtn.querySelector("span").innerText = playlist.isPlaying
    ? "pause"
    : "play_arrow";

  const newColor = song.color;
  if (newColor !== currentColor) {
    container.classList.replace(
      `shadow-${currentColor}-800`,
      `shadow-${newColor}-800`,
    );
    [prevBtn, playBtn, nextBtn].forEach((btn) => {
      btn.classList.replace(`bg-${currentColor}-800`, `bg-${newColor}-800`);
      btn.classList.replace(
        `hover:bg-${currentColor}-700`,
        `hover:bg-${newColor}-700`,
      );
    });
    currentColor = newColor;
  }
}

prevBtn.addEventListener("click", () => {
  playlist.movePrev();
  updateDisplay();
});

nextBtn.addEventListener("click", () => {
  playlist.moveNext();
  updateDisplay();
});

playBtn.addEventListener("click", () => {
  playlist.isPlaying = !playlist.isPlaying;
  updateDisplay();
});

updateDisplay();
