{
    app.beginUndoGroup("Ultimate 3D (Full Link)");

    var comp = app.project.activeItem;
    
    if (comp == null || comp.selectedLayers.length == 0) {
        alert("Please select the 2D Logo layer first!");
    } else {
        var mainLayer = comp.selectedLayers[0];
        
        // --- SETTINGS ---
        var copyCount = 20;     
        var stepX = 1.0;          
        var stepY = 1.0;          
        var stepZ = 2.0;          
        var defaultColor = [0.2, 0.2, 0.2]; 
        // ----------------
        
        // 1. CONTROLS
        var effectsProp = mainLayer.property("Effects");
        
        var sliderEffect = effectsProp.addProperty("ADBE Slider Control");
        sliderEffect.name = "3D Expansion (0-100)";
        sliderEffect.property("Slider").setValue(0); 

        var checkboxEffect = effectsProp.addProperty("ADBE Checkbox Control");
        checkboxEffect.name = "Toggle Shading";
        checkboxEffect.property("Checkbox").setValue(1); 

        // 2. SCAN COLOR
        var targetColor = defaultColor;
        for (var e = 1; e <= effectsProp.numProperties; e++) {
            if (effectsProp.property(e).matchName === "ADBE Fill") {
                targetColor = effectsProp.property(e).property("Color").value;
                break;
            }
        }

        mainLayer.threeDLayer = true;

        for (var i = 1; i <= copyCount; i++) {
            
            var copyLayer = mainLayer.duplicate();
            copyLayer.moveAfter(comp.layer(comp.numLayers));
            copyLayer.name = "Iso_Full_" + i;
            copyLayer.parent = mainLayer;
            
            // --- A) POSITION EXPRESSION ---
            var posExpr = "var slider = thisLayer.parent.effect('3D Expansion (0-100)')('Slider');\n";
            posExpr += "var percent = slider / 100;\n"; 
            posExpr += "var i = " + i + ";\n"; 
            posExpr += "var offX = -1 * i * " + stepX + ";\n"; 
            posExpr += "var offY = -1 * i * " + stepY + ";\n";
            posExpr += "var offZ = i * " + stepZ + ";\n";
            posExpr += "[value[0] + (offX * percent), value[1] + (offY * percent), value[2] + (offZ * percent)];";
            
            copyLayer.position.expression = posExpr;
            
            // --- B) OPACITY LINK EXPRESSION (NEW!) ---
            // Whatever the Opacity of the main layer is, this layer does the same.
            copyLayer.transform.opacity.expression = "thisLayer.parent.transform.opacity";

            // --- C) COLOR AND SHADING ---
            var fillEffect = copyLayer.property("Effects").addProperty("ADBE Fill");
            fillEffect.property("Color").setValue(targetColor); 
            
            var colorExpr = "var useShading = thisLayer.parent.effect('Toggle Shading')('Checkbox');\n";
            colorExpr += "var baseColor = value;\n"; 
            colorExpr += "var i = " + i + ";\n";     
            colorExpr += "var total = " + copyCount + ";\n";
            
            colorExpr += "if (useShading == 1) {\n";
            colorExpr += "    var dark = 1 - (i / total * 0.7);\n"; 
            colorExpr += "    [baseColor[0] * dark, baseColor[1] * dark, baseColor[2] * dark, 1];\n";
            colorExpr += "} else {\n";
            colorExpr += "    baseColor;\n"; 
            colorExpr += "}";
            
            fillEffect.property("Color").expression = colorExpr;

            copyLayer.motionBlur = false;
            copyLayer.shy = true;
        }
        
        comp.hideShyLayers = true;
    }

    app.endUndoGroup();
}
