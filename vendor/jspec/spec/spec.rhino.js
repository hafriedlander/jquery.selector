
load('lib/jspec.js')
load('spec/spec.grammar-less.js')

JSpec
.exec('spec/spec.grammar.js')
.exec('spec/spec.js')
.exec('spec/spec.matchers.js')
.exec('spec/spec.utils.js')
.exec('spec/spec.shared-behaviors.js')
.run({ formatter : JSpec.formatters.Terminal, failuresOnly : true })
.report()