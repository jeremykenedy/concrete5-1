!function(a,b){"use strict";function c(a,c){var d=this,c=b.extend({inputName:!1,unit:"px",appendTo:document.body},c);d.options=c,d.opened=!1,d.$element=a,d.$container=b(d.options.appendTo),d._chooseTemplate=_.template(d.chooseTemplate,{options:d.options}),d._selectorTemplate=_.template(d.selectorWidgetTemplate,{options:d.options}),d.$element.append(d._chooseTemplate),d.$widget=b(d._selectorTemplate),d.$container.append(d.$widget),d.$widget.find("div.ccm-style-customizer-palette-actions button").on("click.style-customizer-palette",function(a){return d.save(a),!1}),d.$element.on("click.style-customizer-palette","[data-launch=style-customizer-palette]",function(a){if(d.opened)d.closeSelector(a);else{var c=d.getPosition();d.$widget.css({top:c.top,left:c.left}).show().on("click.style-customizer-palette",function(a){a.stopPropagation()}),b(document).on("click.style-customizer-palette",function(a){d.closeSelector(a)}),d.opened=!0}return!1})}c.prototype={setValue:function(a,b){var c=this;c.$element.find("input[data-style-customizer-input="+a+"]").val(b)},getPosition:function(){var a=this,b=a.getOffset(a.$widget,a.$element);return b},getOffset:function(a,c){var d=-5,e=a.outerWidth(),f=a.outerHeight(),g=c.outerHeight(),h=a[0].ownerDocument,i=h.documentElement,j=i.clientWidth+b(h).scrollLeft(),k=i.clientHeight+b(h).scrollTop(),l=c.offset();return l.top+=g,l.left-=Math.min(l.left,l.left+e>j&&j>e?Math.abs(l.left+e-j):0),l.top-=Math.min(l.top,l.top+f>k&&k>f?Math.abs(f+g-d):d),l},getValue:function(a){var b=this;return b.$element.find("input[data-style-customizer-input="+a+"]").val()},closeSelector:function(){var a=this;a.$widget.hide(),a.opened=!1,b(document).unbind("click.style-customizer-palette")},updateSwatch:function(){alert("You must implement this method updateSwatch.")},save:function(a){var b=this;b.updateSwatch(),b.closeSelector(a),ConcreteEvent.publish("StyleCustomizerSave")}},a.ConcreteStyleCustomizerPalette=c}(this,$),!function(a,b){"use strict";function c(a,c){var d=this,c=b.extend({inputName:!1,value:!1},c);ConcreteStyleCustomizerPalette.call(d,a,c),d.$widget.find("div[data-style-customizer-field=image]").concreteFileSelector({inputName:d.options.inputName})}c.prototype=Object.create(ConcreteStyleCustomizerPalette.prototype),c.prototype.chooseTemplate='<span data-launch="style-customizer-palette" class="ccm-style-customizer-display-swatch"><input type="hidden" name="<%=options.inputName%>[fID]" data-style-customizer-input="fID" /><span class="ccm-ui"><i class="glyphicon glyphicon-picture"></i></span></span>',c.prototype.selectorWidgetTemplate='<div class="ccm-ui ccm-style-customizer-palette"><% if (options.value) { %><div><label>Current Image</label><div><img src="<%=options.value%>" /></div></div><% } %><div><label>Image</label><div data-style-customizer-field="image" class="ccm-file-selector"></div></div><div class="ccm-style-customizer-palette-actions"><button class="btn btn-primary">Save</button></div></div>',c.prototype.save=function(a){var b=this,c=0,d=b.$widget.find("div.ccm-file-selector-file-selected");d.length&&(c=d.find("input[type=hidden]").val()),b.setValue("fID",c),ConcreteEvent.publish("StyleCustomizerSave"),b.closeSelector(a)},b.fn.concreteStyleCustomizerImageSelector=function(a){return b.each(b(this),function(){new c(b(this),a)})},a.ConcreteStyleCustomizerImageSelector=c}(this,$),!function(a,b){"use strict";function c(a,c){var d=this,c=b.extend({inputName:!1,unit:"px",value:0,appendTo:document.body},c),e=1;ConcreteStyleCustomizerPalette.call(d,a,c),d.$slider=d.$widget.find("div.ccm-style-customizer-slider"),"em"==d.options.unit&&(e=.1),d.$slider.slider({min:0,max:400,step:e,value:d.options.value,create:function(){b(this).parent().find("span").html(d.options.value+d.options.unit)},slide:function(a,c){b(this).parent().find("span").html(c.value+d.options.unit)}})}c.prototype=Object.create(ConcreteStyleCustomizerPalette.prototype),c.prototype.chooseTemplate='<span data-launch="style-customizer-palette"><input type="hidden" name="<%=options.inputName%>[size]" value="<%=options.value%>" data-style-customizer-input="size" /><input type="hidden" name="<%=options.inputName%>[unit]" value="<%=options.unit%>" /><span><%=options.value + options.unit%></span></span>',c.prototype.selectorWidgetTemplate='<div class="ccm-ui ccm-style-customizer-palette ccm-style-customizer-palette-large"><div><label>Size</label><div data-style-customizer-field="size"><div class="ccm-style-customizer-slider"></div><span class="ccm-style-customizer-slider-value"><%=options.value%><%=options.unit%></span></div></div><div class="ccm-style-customizer-palette-actions"><button class="btn btn-primary">Save</button></div></div>',c.prototype.updateSwatch=function(){var a=this,b=a.$element.find("span[data-launch=style-customizer-palette] span");b.html(a.getValue("size")+a.options.unit)},c.prototype.save=function(a){var b=this;b.setValue("size",b.$widget.find("div[data-style-customizer-field=size] div.ccm-style-customizer-slider").slider("value")),b.updateSwatch(),ConcreteEvent.publish("StyleCustomizerSave"),b.closeSelector(a)},b.fn.concreteSizeSelector=function(a){return b.each(b(this),function(){new c(b(this),a)})},a.ConcreteSizeSelector=c}(this,$),!function(a,b){"use strict";function c(a,c){var d=this,c=b.extend({inputName:!1,fontFamily:!1,color:!1,bold:!1,italic:!1,underline:!1,uppercase:!1,fontSizeValue:!1,fontSizeUnit:"px",letterSpacingValue:!1,letterSpacingUnit:"px",lineHeightValue:!1,lineHeightUnit:"px"},c);if(ConcreteStyleCustomizerPalette.call(d,a,c),d.$fontMenu=d.$widget.find("select[data-style-customizer-field=font]"),d.$sliders=d.$widget.find("div.ccm-style-customizer-slider"),d.$sliders.slider({min:0,max:64,value:0,create:function(){b(this).parent().find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-number").html("0")},slide:function(a,c){b(this).parent().find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-number").html(c.value)}}),d.$colorpicker=d.$widget.find("input[data-style-customizer-field=color]"),d.$colorpicker.spectrum({preferredFormat:"rgb",showAlpha:!0}),d.$fontMenu.on("change",function(){var a=b(this).val();b(this).css("font-family",a)}),b.each(d.fonts,function(a,b){d.$fontMenu.append('<option value="'+b+'">'+b+"</option>")}),d.options.fontFamily&&(d.setValue("font-family",d.options.fontFamily),_.indexOf(d.fonts,d.options.fontFamily)<0&&d.$fontMenu.append(b("<option>",{value:d.options.fontFamily,text:d.options.fontFamily})),d.$fontMenu.val(d.options.fontFamily)),d.options.color&&(d.$colorpicker.spectrum("set",d.options.color),d.setValue("color",d.options.color)),d.options.underline&&(d.$widget.find("input[data-style-customizer-field=underline]").prop("checked",!0),d.setValue("underline","1")),d.options.uppercase&&(d.$widget.find("input[data-style-customizer-field=uppercase]").prop("checked",!0),d.setValue("uppercase","1")),d.options.italic&&(d.$widget.find("input[data-style-customizer-field=italic]").prop("checked",!0),d.setValue("italic","1")),d.options.bold&&(d.$widget.find("input[data-style-customizer-field=bold]").prop("checked",!0),d.setValue("bold","1")),d.options.fontSizeValue){var e=d.$widget.find("div[data-style-customizer-field=font-size]"),f=e.find("div.ccm-style-customizer-slider");f.slider("value",d.options.fontSizeValue),"em"==d.options.fontSizeUnit&&(f.slider("option","step",.1),f.slider("option","max",10)),e.find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-number").html(d.options.fontSizeValue),e.find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-unit").html(d.options.fontSizeUnit),d.setValue("font-size",d.options.fontSizeValue)}if(d.options.letterSpacingValue){var e=d.$widget.find("div[data-style-customizer-field=letter-spacing]"),f=e.find("div.ccm-style-customizer-slider");f.slider("value",d.options.letterSpacingValue),"em"==d.options.letterSpacingUnit&&(f.slider("option","step",.1),f.slider("option","max",10)),e.find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-number").html(d.options.letterSpacingValue),e.find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-unit").html(d.options.letterSpacingUnit),d.setValue("letter-spacing",d.options.letterSpacingValue)}if(d.options.lineHeightValue){var e=d.$widget.find("div[data-style-customizer-field=line-height]"),f=e.find("div.ccm-style-customizer-slider");f.slider("value",d.options.lineHeightValue),"em"==d.options.lineHeightUnit&&(f.slider("option","step",.1),f.slider("option","max",10)),e.find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-number").html(d.options.lineHeightValue),e.find("span.ccm-style-customizer-slider-value span.ccm-style-customizer-unit").html(d.options.lineHeightUnit),d.setValue("line-height",d.options.lineHeightValue)}d.updateSwatch()}c.prototype=Object.create(ConcreteStyleCustomizerPalette.prototype),c.prototype.fonts=["Arial","Helvetica","Georgia","Verdana","Trebuchet MS","Book Antiqua","Tahoma","Times New Roman","Courier New","Arial Black","Comic Sans MS"],c.prototype.chooseTemplate='<span class="ccm-style-customizer-display-swatch" data-launch="style-customizer-palette"><input type="hidden" name="<%=options.inputName%>[font-family]" data-style-customizer-input="font-family" /><input type="hidden" name="<%=options.inputName%>[color]" data-style-customizer-input="color" /><input type="hidden" name="<%=options.inputName%>[bold]" data-style-customizer-input="bold" /><input type="hidden" name="<%=options.inputName%>[italic]" data-style-customizer-input="italic" /><input type="hidden" name="<%=options.inputName%>[underline]" data-style-customizer-input="underline" /><input type="hidden" name="<%=options.inputName%>[uppercase]" data-style-customizer-input="uppercase" /><input type="hidden" name="<%=options.inputName%>[font-size][size]" data-style-customizer-input="font-size" /><input type="hidden" name="<%=options.inputName%>[font-size][unit]" value="<%=options.fontSizeUnit%>" /><input type="hidden" name="<%=options.inputName%>[letter-spacing][size]" data-style-customizer-input="letter-spacing" /><input type="hidden" name="<%=options.inputName%>[letter-spacing][unit]" value="<%=options.letterSpacingUnit%>" /><input type="hidden" name="<%=options.inputName%>[line-height][size]" data-style-customizer-input="line-height" /><input type="hidden" name="<%=options.inputName%>[line-height][unit]" value="<%=options.lineHeightUnit%>" /><span>T</span></span>',c.prototype.selectorWidgetTemplate='<div class="ccm-ui ccm-style-customizer-palette"><div><select data-style-customizer-field="font"><option value="">Choose Font</option></select> <input type="text" data-style-customizer-field="color"></div><div class="checkbox"><label><input type="checkbox" class="ccm-flat-checkbox" data-style-customizer-field="bold"> Bold</label></div><div class="checkbox"><label><input type="checkbox" class="ccm-flat-checkbox" data-style-customizer-field="italic"> Italic</label></div><div class="checkbox"><label><input type="checkbox" class="ccm-flat-checkbox" data-style-customizer-field="underline"> Underline</label></div><div class="checkbox"><label><input type="checkbox" class="ccm-flat-checkbox" data-style-customizer-field="uppercase"> Uppercase</label></div><div><label>Font Size</label><div data-style-customizer-field="font-size"><div class="ccm-style-customizer-slider"></div><span class="ccm-style-customizer-slider-value"><span class="ccm-style-customizer-number"></span><span class="ccm-style-customizer-unit">px</span></span></div></div><div><label>Letter Spacing</label><div data-style-customizer-field="letter-spacing"><div class="ccm-style-customizer-slider"></div><span class="ccm-style-customizer-slider-value"><span class="ccm-style-customizer-number"></span><span class="ccm-style-customizer-unit">px</span></span></div></div><div><label>Line Height</label><div data-style-customizer-field="line-height"><div class="ccm-style-customizer-slider"></div><span class="ccm-style-customizer-slider-value"><span class="ccm-style-customizer-number"></span><span class="ccm-style-customizer-unit">px</span></span></div></div><div class="ccm-style-customizer-palette-actions"><button class="btn btn-primary">Save</button></div></div>',c.prototype.updateSwatch=function(){var a=this,b=a.$element.find("span.ccm-style-customizer-display-swatch");b.css("font-family",a.getValue("font-family")),b.css("color",a.getValue("color")),b.css("font-weight","inherit"),b.css("font-style","inherit"),b.css("text-decoration","inherit"),b.css("text-transform","inherit"),"1"===a.getValue("bold")&&b.css("font-weight","bold"),"1"===a.getValue("italic")&&b.css("font-style","italic"),"1"===a.getValue("underline")&&b.css("text-decoration","underline"),"1"===a.getValue("uppercase")&&b.css("text-transform","uppercase"),b.css("letter-spacing",a.getValue("letter-spacing")+a.options.unit),b.css("font-size",a.getValue("font-size")+a.options.unit)},c.prototype.save=function(a){var b=this;b.setValue("font-family",b.$fontMenu.val()),b.setValue("color",b.$widget.find("input[data-style-customizer-field=color]").spectrum("get")),b.setValue("bold",b.$widget.find("input[data-style-customizer-field=bold]").is(":checked")?"1":0),b.setValue("italic",b.$widget.find("input[data-style-customizer-field=italic]").is(":checked")?"1":0),b.setValue("underline",b.$widget.find("input[data-style-customizer-field=underline]").is(":checked")?"1":0),b.setValue("uppercase",b.$widget.find("input[data-style-customizer-field=uppercase]").is(":checked")?"1":0),b.setValue("font-size",b.$widget.find("div[data-style-customizer-field=font-size] div.ccm-style-customizer-slider").slider("value")),b.setValue("letter-spacing",b.$widget.find("div[data-style-customizer-field=letter-spacing] div.ccm-style-customizer-slider").slider("value")),b.setValue("line-height",b.$widget.find("div[data-style-customizer-field=line-height] div.ccm-style-customizer-slider").slider("value")),b.updateSwatch(),ConcreteEvent.publish("StyleCustomizerSave"),b.closeSelector(a)},b.fn.concreteTypographySelector=function(a){return b.each(b(this),function(){new c(b(this),a)})},a.ConcreteTypographySelector=c}(this,$);