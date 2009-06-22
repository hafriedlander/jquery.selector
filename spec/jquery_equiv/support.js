/** Stubs to get the jQuery selector unit tests running */

function module(){/*NOP*/}
function expect(){/*NOP*/}

function ok(a, msg) {/*NOP*/}
function equals(a, b, msg) {/*NOP*/}
function isSet(){/*NOP*/} 

var passed = 0;
var failed = 0;
var skipped = 0;

var fixture, ajaxSettings;
var tests = [];

function test(name, func) {
	if (name != 'XML Document Selectors') tests[tests.length] = [name, func];
}

$(function(){
	fixture = document.getElementById('main').innerHTML;
	ajaxSettings = $.ajaxSettings;
	
	for (var i=0; i<tests.length; i++) {
		reset();
		$('#res').append('<div class="section">'+tests[i][0]+'</div>');
		tests[i][1]();
	}
	
	$('#res').prepend('<h1>Passed '+passed+' Failed '+failed+' Skipped '+skipped+'</h1>');
});

/* Resets the test setup. Useful for tests that modify the DOM. */
function reset() {
	$("#main").html( fixture );
	$.event.global = {};
	$.ajaxSettings = $.extend({}, ajaxSettings);
}

/**
 * Asserts that a select matches the given IDs
 * @example t("Check for something", "//[a]", ["foo", "baar"]);
 * @result returns true if "//[a]" return two elements with the IDs 'foo' and 'baar'
 */
function t(a,b,c) {
	b = b.replace(/^#form select:first/, '#select1'); // We don't support :first, but want these tests to run
	
	if (
		b.match(/:(contains)/) ||
		b.match(/:(first|last|nth)([^\-]|$)/) ||
		b.match(/:(even|odd|eq|lt|gt)/) ||
		b.match(/:(has)/)
	) {
		$('#res').append('<div class="skip">  '+a+' '+b+' SKIP</div>');
		skipped++;
		return;
	}
	
	var sel = $.selector(b);
	var pass = true ;
	var res = [];
	var els = [];
	
	$('*').each(function(i,el){
		var id = $.attr(el, "id");
		if (sel.is(el)) { res.push(id); els.push($(el).attr('name')); }
	})
	
	if (res.length !== c.length) pass = false;
	else {
		for (var i = 0; i < c.length; i++) {
			if ( c[i] != res[i] ) { pass = false; break; }	
		}
	}

	pass ? passed++ : failed++;	
	$('#res').append('<div class="'+(pass?'pass':'fail')+'">  '+a+' '+b+ ( pass ? ' PASS' : ' FAIL. Wanted: '+c+' Got: '+els ) + '</div>');
}

/**
 * Returns an array of elements with the given IDs, eg.
 * @example q("main", "foo", "bar")
 * @result [<div id="main">, <span id="foo">, <input id="bar">]
 */
function q() {
	var r = [];
	for ( var i = 0; i < arguments.length; i++ )
		r.push( document.getElementById( arguments[i] ) );
	return r;
}
