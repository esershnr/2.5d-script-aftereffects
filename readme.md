[🇹🇷 Türkçe Oku](./readme_tr.md)

# How to Use?

1. Select the main **2D Logo layer**
2. Run the script.
3. Check the **Effect Controls** panel.

You will see two settings:

- **3D Expansion (0-100):** Determines how much the animation (Accordion) expands.
- **Toggle Shading:** If checked, the depth becomes darker (Shaded); if unchecked, it becomes flat color (Flat).

You can now instantly change both the animation and the style (Flat vs Shaded). Ideally acting as a full control panel!

## Important Note (For Performance)

If you are going to add heavy effects like **Glow, Drop Shadow, Bevel** to the main logo, **DO NOT** do this before running the script.

**Why?** Because the script copies the effects on the layer when it duplicates it.

- Glow on 1 layer = Fast Render.
- Glow on 50 layers = Your computer might freeze depending on your system.

### Correct Workflow:

1. Run this Script while the 2D version of the logo (without effects) is in the scene.
2. When the process is finished, select all created layers, including the main logo.
3. Right click -> **Pre-compose** (Make them all a single package).
4. Now apply the Glow or effect you want onto that Pre-comp. Your system won't get tired and the effect will be applied as a single piece over the 3D block.
