export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width;
  sprite.width = parent.width / (100 / percent);
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100);
};

export const scaleFitScreen = (sprite, game)=> {
  var maxSize = Math.max(game.world.height, game.world.width);
  var spriteSize = Math.max(sprite.texture.width, sprite.texture.height);
  var scale = maxSize/spriteSize;
  sprite.scale.setTo(scale);
  return sprite;
}

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
