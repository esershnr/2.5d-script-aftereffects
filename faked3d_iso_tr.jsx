{
    app.beginUndoGroup("Ultimate 3D (Full Link)");

    var comp = app.project.activeItem;
    
    if (comp == null || comp.selectedLayers.length == 0) {
        alert("Lütfen önce 2D Logo katmanını seç!");
    } else {
        var mainLayer = comp.selectedLayers[0];
        
        // --- AYARLAR ---
        var kopyaSayisi = 20;     
        var adimX = 1.0;          
        var adimY = 1.0;          
        var adimZ = 2.0;          
        var varsayilanRenk = [0.2, 0.2, 0.2]; 
        // ----------------
        
        // 1. KONTROLLER
        var effectsProp = mainLayer.property("Effects");
        
        var sliderEffect = effectsProp.addProperty("ADBE Slider Control");
        sliderEffect.name = "3D Genişleme (0-100)";
        sliderEffect.property("Slider").setValue(0); 

        var checkboxEffect = effectsProp.addProperty("ADBE Checkbox Control");
        checkboxEffect.name = "Gölge (Shading) Aç/Kapat";
        checkboxEffect.property("Checkbox").setValue(1); 

        // 2. RENK TARA
        var hedefRenk = varsayilanRenk;
        for (var e = 1; e <= effectsProp.numProperties; e++) {
            if (effectsProp.property(e).matchName === "ADBE Fill") {
                hedefRenk = effectsProp.property(e).property("Color").value;
                break;
            }
        }

        mainLayer.threeDLayer = true;

        for (var i = 1; i <= kopyaSayisi; i++) {
            
            var copyLayer = mainLayer.duplicate();
            copyLayer.moveAfter(comp.layer(comp.numLayers));
            copyLayer.name = "Iso_Full_" + i;
            copyLayer.parent = mainLayer;
            
            // --- A) POZİSYON EXPRESSION ---
            var posExpr = "var slider = thisLayer.parent.effect('3D Genişleme (0-100)')('Slider');\n";
            posExpr += "var percent = slider / 100;\n"; 
            posExpr += "var i = " + i + ";\n"; 
            posExpr += "var offX = -1 * i * " + adimX + ";\n"; 
            posExpr += "var offY = -1 * i * " + adimY + ";\n";
            posExpr += "var offZ = i * " + adimZ + ";\n";
            posExpr += "[value[0] + (offX * percent), value[1] + (offY * percent), value[2] + (offZ * percent)];";
            
            copyLayer.position.expression = posExpr;
            
            // --- B) OPACITY LINK EXPRESSION (YENİ!) ---
            // Ana katmanın Opacity değerini ne yaparsan bu katman da aynısını yapar.
            copyLayer.transform.opacity.expression = "thisLayer.parent.transform.opacity";

            // --- C) RENK VE SHADING ---
            var fillEffect = copyLayer.property("Effects").addProperty("ADBE Fill");
            fillEffect.property("Color").setValue(hedefRenk); 
            
            var colorExpr = "var useShading = thisLayer.parent.effect('Gölge (Shading) Aç/Kapat')('Checkbox');\n";
            colorExpr += "var baseColor = value;\n"; 
            colorExpr += "var i = " + i + ";\n";     
            colorExpr += "var total = " + kopyaSayisi + ";\n";
            
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