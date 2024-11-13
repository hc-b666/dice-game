# Console Dice Game

This is dice game in console.

## Installation
```bash
git clone https://github.com/hc-b666/dice-game.git
cd dice-game
node app.js
```

## Example
```bash
node app.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
Let's determine who makes the first move.
I selected a random value in the range 0..1 (HMAC=C8E79615E637E6B14DDACA2309069A76D0882A4DD8102D9DEAD3FD6AC4AE289A).
Try to guess my selection.
0 - 0
1 - 1
X - exit
? - help
Your selection: 0
My selection: 1 (KEY=BD9BE48334BB9C5EC263953DA54727F707E95544739FCE7359C267E734E380A2).
I make the first move and choose the [6,8,1,1,8,6] dice.
Choose your dice:
0 - 2,2,4,4,9,9 
1 - 7,5,3,7,5,3
X - exit
? - help
Your selection: 0 
You choose the [2,2,4,4,9,9] dice.
It's time for my throw.
I selected a random value in the range 0..5 (HMAC=AA29E7275FE17A8D1184E2D4B6B0F46D815224270C94907CF007F2118CF400F7).
Add your number modulo 6.
0 - 0
1 - 1
2 - 2
3 - 3
4 - 4
5 - 5
X - exit
? - help
Your selection: 4
My number is 3 (KEY=7329ABD54A1633D2079EA7A48B401018D7EE6DD4C130AB5C31BC029CC8359637).
The result is 3 + 4 = 1 (mod 6).
My throw is 8.
It's time for your throw.
I selected a random value in the range 0..5 (HMAC=652863C27870CCA331458F4658D89413F405736FE5AA19B868FBDDAB5611A406).
Add your number modulo 6.
0 - 0
1 - 1
2 - 2
3 - 3
4 - 4
5 - 5
X - exit
? - help
Your selection: 5
My number is 0 (KEY=92564A82A515DEBC3FE9842D20DCEA3F3AAFB2080314A09A1E9A2CC729EDAF44).
The result is 0 + 5 = 5 (mod 6).
Your throw is 9.
You win (9 > 8)!
```

