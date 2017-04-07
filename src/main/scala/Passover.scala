/**
  * Created by Joseph K. Strauss on 4/2/2017.
  */

import scala.annotation.tailrec
import scala.io.Source
import scalatags.Text.all._

object Passover extends App {
  implicit val codec = scala.io.Codec.UTF8

  def byStanza(lines: List[String]): List[Stanza] = {
    @tailrec
    def loop(lines: List[String], stanza: Stanza, acc: List[Stanza]): List[Stanza] = {
      if(lines.isEmpty) acc.reverse
      else if(lines.head.trim.isEmpty) loop(lines.tail, Nil, stanza.reverse :: acc)
      else loop(lines.tail, lines.head.trim :: stanza, acc)
    }
    loop(lines, Nil, Nil)
  }

  val lines = Source.fromFile("src/main/resources/passover/passover.txt").getLines.toList
  val lines2 = lines.map(line(_))
  val lines3 = byStanza(lines).zipWithIndex
  val sofPosuk = "׃"
  def acrostic(text: String, letters: Int = 1) = {
    val regex = s"\ufeff?((?:[\u05d0-\u05ea][^\u05d0-\u05ea]*){${letters}})(.*)".r
    text match {
      case regex(acrostic, balance) => span(
        span(fontWeight := "bold")(
          acrostic
        ),
        span(balance)
      )
      case _ => span(text)
    }
  }

  def stanzaToHtml(stanza: Stanza, stanzaIndex: Int) = for((line, lineIndex) <- stanza.zipWithIndex) yield
    if (stanzaIndex == 2) div(display := "table-row")(("פֶּֽסַח" + "\u00A0"), line.split("׃").zipWithIndex.map{
      case (subStanza, i) if i <= 1 => span(display := "table-cell", paddingLeft := 10)(acrostic(subStanza.trim), sofPosuk, " ")
      case (subStanza, _) => span(display := "table-cell", fontFamily := "Times New Roman")(subStanza, sofPosuk, " ")
    })
    else div(
      span(display := "inline-block", textAlign := "left", width := "12ex")(if(lineIndex == 0) "לֵיל שִׁמּוּרִים לְ" else ""),
      span(textAlign := "right", display := "inline-block", width := 300)(
        if ((stanzaIndex < 6 || lineIndex < 2) && lineIndex != 1) acrostic(line)
        else line.split(" ").zipWithIndex.map {
          case (word, wordIndex) => {
            val numLetters = if (stanzaIndex == 6 && wordIndex == 0 && lineIndex == 3) 2 else 1
            span(
              if (lineIndex == 1 && wordIndex > 0) span(fontFamily := "Times New Roman")(word)
              else if (wordIndex >= 3) word
              else acrostic(word, numLetters),
              " "
            )
          }
        }
      )
    )

  val stanzas = for((stanza, stanzaIndex) <- lines3) yield div(stanzaToHtml(stanza, stanzaIndex))

  import java.io.{File, PrintWriter}
  import java.nio.charset.StandardCharsets
  import java.nio.file.{Files, Paths, StandardOpenOption}
  val outfile = File.createTempFile("target", "passover.html")

  val outstream = new PrintWriter(Files.newBufferedWriter(Paths.get("target/passover.html"), StandardCharsets.UTF_8, StandardOpenOption.TRUNCATE_EXISTING))
  outstream.println(
    html(dir := "rtl", fontSize := 15, fontFamily := "Arial")(
      head(
        meta(charset := "UTF-8")/*,
        meta(httpEquiv := "refresh", content := 3)*/
      ),
      body(
        div(zIndex := 2)(Maariv.render(stanzas))
      )
    ).render
  )
  outstream.flush()
  outstream.close()
  def line(text: String) = text

  //println(line("Hello"))

  //case class Letter(charcters: String)

  //case class Word(letters: List[Letter])

  type Stanza = List[String]
}
