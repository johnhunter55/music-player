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

playlist.append({ title: "I THINK - Tyler, The Creator", color: "pink" });
playlist.append({ title: "STAY HERE 4 LIFE - A$AP Rocky", color: "blue" });
playlist.append({ title: "2000 EXCURSION - Travis Scott", color: "zinc" });
playlist.append({ title: "PURPLE RAIN - Don Toliver", color: "indigo" });
playlist.append({ title: "Ladders - Mac Miller", color: "taupe" });

const display = document.getElementById("current-song");
const playBtn = document.getElementById("btn-play");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const container = document.querySelector(".w-xl");

let currentColor = "emerald";

function updateDisplay() {
  const song = playlist.getCurrent();
  display.innerText = song.title;
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
